import * as vscode from 'vscode';

export class PocketframeDefinitionProvider implements vscode.DefinitionProvider {
  async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Definition | undefined> {
    const wordRange = document.getWordRangeAtPosition(position, /[\w']+/);
    if (!wordRange) return undefined;

    const word = document.getText(wordRange);
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) return undefined;

    // Search in current document first
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (line.text.includes(`@${word}`)) {
        return new vscode.Location(document.uri, new vscode.Position(i, line.text.indexOf(word)));
      }
    }

    // Then search workspace files
    const uris = await vscode.workspace.findFiles(`**/${word}.view.php`);
    if (uris.length > 0) {
      return new vscode.Location(uris[0], new vscode.Position(0, 0));
    }

    return undefined;
  }
}
