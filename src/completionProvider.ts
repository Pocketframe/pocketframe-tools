import * as vscode from 'vscode';

export class PocketframeCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    return [
      this.createCompletion('if', 'Control flow', '<% if ($1) %>\n\t$0\n<% endif %>'),
      this.createCompletion('foreach', 'Loop', '<% foreach ($1 as $item) %>\n\t$0\n<% endforeach %>'),
      this.createCompletion('block', 'Template block', '<% block $1 %>\n\t$0\n<% endblock %>'),
      this.createCompletion('extends', 'Inheritance', '<% extends "$1" %>'),
      this.createCompletion('route', 'URL generation', "route('$1')"),
      this.createCompletion('csrf_token', 'Security', 'csrf_token'),
    ];
  }

  private createCompletion(label: string, detail: string, snippet: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Keyword);
    item.detail = detail;
    item.insertText = new vscode.SnippetString(snippet);
    return item;
  }
}
