import * as vscode from 'vscode';

export class PocketframeFormatter implements vscode.DocumentFormattingEditProvider {
  private formatDocument(document: vscode.TextDocument): vscode.TextEdit[] {
    const edits: vscode.TextEdit[] = [];
    const config = vscode.workspace.getConfiguration('pocketframe');
    const indentSize = config.get<number>('format.indentSize', 4);
    let indentLevel = 0;
    let htmlIndentLevel = 0;
    const indentString = ' '.repeat(indentSize);

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let text = line.text.trim();

      // Handle Pocketframe control structures
      if (text.startsWith('<%')) {
        const isClosing = text.match(/<%-\s*(endif|endforeach|endblock|else|endmethod)/);
        const isOpening = text.match(/<%-\s*(if|foreach|block|method)/);

        if (isClosing) {
          indentLevel = Math.max(indentLevel - 1, 0);
        }

        // Apply indentation before control structure
        const newText = indentString.repeat(indentLevel) + text;
        edits.push(vscode.TextEdit.replace(line.range, newText));

        if (isOpening) {
          indentLevel++;
        }
      } else {
        // Handle HTML indentation
        const htmlClose = text.match(/<\/\w+/);
        const htmlOpen = text.match(/<\w+(?![^>]*\/>)/);

        if (htmlClose) {
          htmlIndentLevel = Math.max(htmlIndentLevel - 1, 0);
        }

        const totalIndent = indentLevel + htmlIndentLevel;
        const formattedLine = indentString.repeat(totalIndent) + text;
        edits.push(vscode.TextEdit.replace(line.range, formattedLine));

        if (htmlOpen && !text.endsWith('/>')) {
          htmlIndentLevel++;
        }
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
