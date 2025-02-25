import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  // Register a completion provider for Pocketframe files (.view.php)
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    'pocketframe',
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const completions: vscode.CompletionItem[] = [];

        // Snippet: if statement
        const ifSnippet = new vscode.CompletionItem('if', vscode.CompletionItemKind.Snippet);
        ifSnippet.insertText = new vscode.SnippetString('<% if ($1) %>\n\t$0\n<% endif %>');
        ifSnippet.detail = 'Pocketframe if statement';
        completions.push(ifSnippet);

        // Snippet: foreach loop
        const foreachSnippet = new vscode.CompletionItem('foreach', vscode.CompletionItemKind.Snippet);
        foreachSnippet.insertText = new vscode.SnippetString('<% foreach ($1 as $item) %>\n\t$0\n<% endforeach %>');
        foreachSnippet.detail = 'Pocketframe foreach loop';
        completions.push(foreachSnippet);

        // Global helper completions for the entire framework:
        const routeCompletion = new vscode.CompletionItem('route', vscode.CompletionItemKind.Function);
        routeCompletion.insertText = new vscode.SnippetString("route('$1', $2)");
        routeCompletion.documentation = new vscode.MarkdownString('Generate a URL using a named route.');
        completions.push(routeCompletion);

        const redirectCompletion = new vscode.CompletionItem('redirect', vscode.CompletionItemKind.Function);
        redirectCompletion.insertText = new vscode.SnippetString("redirect('$1')");
        redirectCompletion.documentation = new vscode.MarkdownString('Redirect to a given URL.');
        completions.push(redirectCompletion);

        const csrfCompletion = new vscode.CompletionItem('csrf_token', vscode.CompletionItemKind.Function);
        csrfCompletion.insertText = new vscode.SnippetString("csrf_token");
        csrfCompletion.documentation = new vscode.MarkdownString('Generate a CSRF token.');
        completions.push(csrfCompletion);

        return completions;
      }
    },
    '%' // Trigger completions when "%" is typed.
  );
  context.subscriptions.push(completionProvider);

  // Register a basic Definition Provider (customize as needed)
  const definitionProvider = vscode.languages.registerDefinitionProvider('pocketframe', {
    provideDefinition(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Definition> {
      // For now, simply return the top of the document.
      return new vscode.Location(document.uri, new vscode.Position(0, 0));
    }
  });
  context.subscriptions.push(definitionProvider);

  // Register command: Show Extension Version
  const showVersionCmd = vscode.commands.registerCommand('pocketframeTools.showVersion', () => {
    vscode.window.showInformationMessage('Pocketframe Tools extension version 0.0.1');
  });
  context.subscriptions.push(showVersionCmd);

  // Register command: Serve the Framework
  // This command will run "php -S localhost:8000 -t public index.php" assuming your framework CLI supports it.
  const serveCmd = vscode.commands.registerCommand('pocketframeTools.serve', () => {
    vscode.window.showInformationMessage('Starting Pocketframe development server...');
    // Adjust the command as necessary for your framework.
    const command = 'php -S localhost:8000 -t . index.php';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`Error starting server: ${error.message}`);
        return;
      }
      vscode.window.showInformationMessage(`Server started on http://localhost:8000`);
    });
  });
  context.subscriptions.push(serveCmd);
}

export function deactivate() {}
