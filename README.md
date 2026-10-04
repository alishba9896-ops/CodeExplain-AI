# 🤖 CodeExplain AI

> **Get a clear explanation of a code snippet without leaving VS Code.**

Select code in the editor, run **`CodeExplain AI: Explain Selected Code`**, and read the result in a formatted Markdown preview beside your file.

---

## ✨ What It Does

* 🧠 Explains the selected code in the context of its programming language.
* 🤖 Uses a language model available through VS Code. If more than one model is available, you can choose which one to use.
* 📝 Opens the explanation in a rendered Markdown preview, with the selected code included for reference.
* ⚠️ Gives a helpful message if there is no editor, no selection, or no available language model.

---

## 📋 Requirements

| Requirement               | Details                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 💻 **Visual Studio Code** | **1.140.0 or newer**                                                                                                                          |
| 🤖 **Language Model**     | Access to a language model through VS Code. Model availability depends on the providers and accounts configured in your VS Code installation. |

> 🔒 **Privacy:** The selected code is sent to the language model you choose so it can generate the explanation. Review your provider's data and privacy policies before sending sensitive code.

---

## 🛠️ Try It From Source

This project is not currently published as an installable Marketplace release.

To try the extension from the source code:

### 1️⃣ Clone or Download

Clone or download this repository and open its folder in VS Code.

### 2️⃣ Install Dependencies

Install dependencies from the project folder:

```sh
npm install
```

### 3️⃣ Launch the Extension

Press **`F5`** to open a new **Extension Development Host** window.

### 4️⃣ Select Your Code

In that window, open a source file and select a snippet.

### 5️⃣ Run CodeExplain AI

Run **`CodeExplain AI: Explain Selected Code`** from the Command Palette:

**`Ctrl+Shift+P`** on Windows/Linux
**`Cmd+Shift+P`** on macOS

Or right-click the selection and choose the command.

> 💡 The explanation opens in a Markdown preview beside the source file.

If multiple models are available, choose one from the picker before the request begins.

---

## 🧰 Troubleshooting

### ❌ The extension fails to load in the development host

Check that the VS Code version running the Extension Development Host is **1.140.0 or newer**.

The host must meet the same minimum version as your regular VS Code window.

---

### 🤖 No language models are available

Sign in to or configure a model provider supported by your VS Code installation, then try the command again.

The extension uses VS Code's Language Model API and does not include its own model or API key.

---

### ⚠️ The command says to select code

Return to a source editor, select the code you want explained, and run the command again.

The command is also available in the editor's right-click menu when text is selected.

---

## 👨‍💻 Development

Install dependencies with `npm install`, then use these scripts from the project folder:

| Command           | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `npm run compile` | Compile the TypeScript extension.                        |
| `npm run watch`   | Recompile automatically as source files change.          |
| `npm run lint`    | Check the source with ESLint.                            |
| `npm test`        | Compile, lint, and run the VS Code extension test suite. |

### 🐞 Debugging

To debug, start the extension with **`F5`** and set breakpoints in:

```text
src/extension.ts
```

The Extension Development Host's Debug Console shows extension output.

---

## 🎯 Current Scope

CodeExplain AI currently explains selected code.

> 🚧 **Not implemented yet:** Debugging, code improvement, and test generation.

---

## 🤝 Contributing

Bug reports and focused contributions are welcome.

Before submitting a change, run:

```sh
npm test
```

and include steps to reproduce or verify user-facing behavior.

---

<div align="center">

### 🚀 CodeExplain AI

**Understand your code without leaving VS Code.**

</div>
