import * as vscode from 'vscode';
import { exec } from 'child_process';
import { PocketframeFormatter } from './formatter';
import { PocketframeCompletionProvider } from './completionProvider';
import { PocketframeDefinitionProvider } from './definitionProvider';
import { PocketframeHoverProvider } from './hoverProvider';

export function activate(context: vscode.ExtensionContext) {
  // Register all providers
  const selector: vscode.DocumentSelector = { language: 'pocketframe', scheme: 'file' };

  // Completion Provider
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      selector,
      new PocketframeCompletionProvider(),
      '%' // Trigger character
    )
  );

  // Definition Provider
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      selector,
      new PocketframeDefinitionProvider()
    )
  );

  // Hover Provider
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      selector,
      new PocketframeHoverProvider()
    )
  );

  // Formatter
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      selector,
      new PocketframeFormatter()
    )
  );

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('pocketframeTools.showVersion', () => {
      vscode.window.showInformationMessage('Pocketframe Tools extension version 0.0.1');
    }),
    vscode.commands.registerCommand('pocketframeTools.serve', () => {
      vscode.window.showInformationMessage('Starting Pocketframe development server...');
      exec('php -S localhost:8000 -t . index.php', (error) => {
        if (error) {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
          return;
        }
        vscode.window.showInformationMessage('Server started on http://localhost:8000');
      });
    })
  );
}

export function deactivate() {}
