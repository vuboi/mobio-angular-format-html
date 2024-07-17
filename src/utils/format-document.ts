import vscode from 'vscode';
import { formatHtmlDocument } from './html.formatter';

/**
 * Format the given document based on its language
 */
export async function formatDocument(doc: vscode.TextDocument): Promise<void> {
  const language = doc?.languageId;
  if (!language) {
    vscode.window.showWarningMessage('No language found for active document');
    return;
  }

  const text = doc?.getText();
  if (!text) {
    vscode.window.showWarningMessage('No text found in active document');
    return;
  }

  if (language !== 'html') {
    vscode.window.showWarningMessage(`Unsupported language: ${language}`);
    return;
  }

  formatHtmlDocument(text);
}