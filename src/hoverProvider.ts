import * as vscode from 'vscode';

export class PocketframeHoverProvider implements vscode.HoverProvider {
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {

        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }

        const word = document.getText(wordRange);
        const hoverText = new vscode.MarkdownString(`**Pocketframe Keyword:** \`${word}\``);

        return new vscode.Hover(hoverText);
    }
}
