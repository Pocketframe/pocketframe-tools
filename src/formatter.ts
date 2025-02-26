import * as vscode from 'vscode';

export class PocketframeFormatter implements vscode.DocumentFormattingEditProvider {
  private formatDocument(document: vscode.TextDocument): vscode.TextEdit[] {
    const edits: vscode.TextEdit[] = [];
    const config = vscode.workspace.getConfiguration('pocketframe');
    const indentSize = config.get<number>('format.indentSize', 4);
    let indentLevel = 0;
    const indentString = ' '.repeat(indentSize);
    let inHtmlTag = false;

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let text = line.text.trim();
      let newText = '';

      // Handle Pocketframe control structures
      const controlMatch = text.match(/<%\s*(\/?\w+)/);
      if (controlMatch) {
        const [_, directive] = controlMatch;
        const isEndTag = directive.startsWith('end') || directive === 'else';

        if (isEndTag) indentLevel = Math.max(indentLevel - 1, 0);

        newText = indentString.repeat(indentLevel) + text;

        if (!isEndTag && ['if', 'foreach', 'block'].includes(directive)) {
          indentLevel++;
        }
      }
      // Handle HTML content
      else {
        const htmlOpen = text.match(/<([a-zA-Z]+)(?![^>]*\/>)/);
        const htmlClose = text.match(/<\/([a-zA-Z]+)/);

        if (htmlClose) indentLevel = Math.max(indentLevel - 1, 0);

        newText = indentString.repeat(indentLevel) + text;

        if (htmlOpen && !text.endsWith('/>')) {
          indentLevel++;
        }
      }

      edits.push(vscode.TextEdit.replace(line.range, newText));
    }

    return edits;
  }

  public provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.TextEdit[] {
    try {
      if (token.isCancellationRequested) return [];
      return this.formatDocument(document);
    } catch (error) {
      vscode.window.showErrorMessage(`Formatting failed: ${error}`);
      return [];
    }
  }
}
