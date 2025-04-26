import * as vscode from 'vscode';
import { VimState } from '../vim_state_types';

export function indentLeft(vimState: VimState): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const startLine = selection.start.line;
            const endLine = selection.end.line;

            for (let line = startLine; line <= endLine; line++) {
                const lineText = editor.document.lineAt(line).text;
                const firstNonWhitespace = lineText.search(/\S/);
                
                if (firstNonWhitespace > 0) {
                    const newIndent = Math.max(0, firstNonWhitespace - 4); // Assuming 4 spaces per indent
                    const newText = ' '.repeat(newIndent) + lineText.trimLeft();
                    editBuilder.replace(editor.document.lineAt(line).range, newText);
                }
            }
        });
    });
}

export function indentRight(vimState: VimState): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const startLine = selection.start.line;
            const endLine = selection.end.line;

            for (let line = startLine; line <= endLine; line++) {
                const lineText = editor.document.lineAt(line).text;
                const firstNonWhitespace = lineText.search(/\S/);
                
                const newIndent = firstNonWhitespace + 4; // Assuming 4 spaces per indent
                const newText = ' '.repeat(newIndent) + lineText.trimLeft();
                editBuilder.replace(editor.document.lineAt(line).range, newText);
            }
        });
    });
} 