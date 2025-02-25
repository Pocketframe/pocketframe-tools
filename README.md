# Pocketframe Tools

Pocketframe Tools is a Visual Studio Code extension that provides advanced language support for the entire Pocketframe framework. It offers:

- **Syntax Highlighting**: For Pocketframe templating files (`.pxt.php`) and framework-specific syntax.
- **Code Completion & Snippets**: Fast insertion of common templating and helper function snippets.
- **Go-To Definition**: Basic navigation support (customize as needed).
- **Commands**: Framework-specific commands like "Serve" to run the development server.
- **Integration with Pocketframe**: Enhanced support for helper functions like `route()`, `redirect()`, and `csrf_token()`.

## Features

- **File Extension**: Recognizes files ending with `.pxt.php`.
- **Syntax Highlighting**: Custom TextMate grammar for Pocketframe templates.
- **IntelliSense**: Provides auto-completion for control structures, helpers, and common snippets.
- **Go-To Definition**: Navigate to definitions (basic implementation).
- **Commands**: Run Pocketframe CLI commands directly from VS Code.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run compile` to compile the TypeScript code.
4. Press `F5` in VS Code to launch an Extension Development Host and test the extension.

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

[MIT](LICENSE)
