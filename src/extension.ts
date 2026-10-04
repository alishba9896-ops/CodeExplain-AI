import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand('codeexplain-ai.explainSelectedCode', explainSelectedCode),
	);
}

async function explainSelectedCode(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		void vscode.window.showWarningMessage('Open a file and select code to explain.');
		return;
	}

	const selectedCode = editor.document.getText(editor.selection);
	if (!selectedCode.trim()) {
		void vscode.window.showWarningMessage('Select some code to explain.');
		return;
	}

	try {
		const models = await vscode.lm.selectChatModels();
		if (models.length === 0) {
			void vscode.window.showInformationMessage(
				'No language models are available. Sign in to a model provider in VS Code, then try again.',
			);
			return;
		}

		let model: vscode.LanguageModelChat;
		if (models.length === 1) {
			model = models[0];
		} else {
			const selectedModel = await vscode.window.showQuickPick(
				models.map((model) => ({
					label: model.name,
					description: `${model.vendor} · ${model.family}`,
					model,
				})),
				{ placeHolder: 'Choose a language model to explain the selected code' },
			);
			if (!selectedModel) {
				return;
			}
			model = selectedModel.model;
		}

		let explanation = '';
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: 'CodeExplain AI: Explaining selected code',
				cancellable: true,
			},
			async (_progress, cancellationToken) => {
				const response = await model.sendRequest(
					[
						vscode.LanguageModelChatMessage.User(
							`Explain what this ${editor.document.languageId} code does. Describe its inputs, important steps, and output in clear language.\n\n${selectedCode}`,
						),
					],
					{},
					cancellationToken,
				);
				for await (const fragment of response.text) {
					explanation += fragment;
				}
			},
		);

		if (!explanation.trim()) {
			void vscode.window.showInformationMessage('The language model returned an empty explanation.');
			return;
		}

		const codeFence = '`'.repeat(
			Math.max(3, ...Array.from(selectedCode.matchAll(/`+/g), ([sequence]) => sequence.length + 1)),
		);
		const result = await vscode.workspace.openTextDocument({
			language: 'markdown',
			content: `# Code Explanation\n\n${explanation.trim()}\n\n---\n\n### Selected code\n\n${codeFence}${editor.document.languageId}\n${selectedCode}\n${codeFence}\n`,
		});
		await vscode.commands.executeCommand('markdown.showPreviewToSide', result.uri);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		void vscode.window.showErrorMessage(`Couldn't explain the selected code: ${message}`);
	}
}
