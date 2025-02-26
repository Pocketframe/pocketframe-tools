import * as vscode from 'vscode';

export class PocketframeFormatter implements vscode.DocumentFormattingEditProvider {
  private formatDocument(document: vscode.TextDocument): vscode.TextEdit[] {
    const edits: vscode.TextEdit[] = [];
    const indentSize = vscode.workspace.getConfiguration('pocketframe').get<number>('format.indentSize', 4);
    let indentLevel = 0;
    const indentString = ' '.repeat(indentSize);

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let text = line.text;

      // Handle closing tags indentation
      if (text.match(/<%-\s*(endif|endforeach|endblock|else|endmethod)\s*%>/)) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }

      // Apply current indentation
      const newText = indentString.repeat(indentLevel) + text.trimStart();
      edits.push(vscode.TextEdit.replace(line.range, newText));

      // Handle opening tags indentation
      if (text.match(/<%-\s*(if|foreach|block|method)\s*%>/)) {
        indentLevel++;
      }
    }

    return edits;
  }

  public provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.TextEdit[] {
    if (!vscode.workspace.getConfiguration('pocketframe').get('format.enable', true)) {
      return [];
    }
    return this.formatDocument(document);
  }
}
