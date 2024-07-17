import * as vscode from 'vscode';
import { formatHtmlDocument } from './utils/html.formatter';
import { formatDocument } from './utils/format-document';

// TODO: Add options json to change config format
export class HTMLDocumentFormatter implements vscode.DocumentFormattingEditProvider {
	public provideDocumentFormattingEdits(document: vscode.TextDocument): Thenable<vscode.TextEdit[]> {
		const text = document.getText();
		const range = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);
		return Promise.resolve([
			new vscode.TextEdit(range, formatHtmlDocument(text)),
		]);
	}
}

export function activate(context: vscode.ExtensionContext) {
	const formatter = new HTMLDocumentFormatter();
	const subs = context.subscriptions;

	// Register the document formatting provider
	subs.push(
		vscode.languages.registerDocumentFormattingEditProvider("html", formatter)
	);
	// Register the command
	subs.push(vscode.commands.registerCommand('mobio.format-angular-html-file', async () => {
		const doc = vscode.window.activeTextEditor?.document;
		if (!doc) {
			vscode.window.showWarningMessage('No active document found');
			return;
		}

		await formatDocument(doc);
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
