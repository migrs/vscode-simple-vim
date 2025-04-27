import * as vscode from 'vscode';

export function joinLines(): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const line = editor.document.lineAt(selection.active.line);
            const nextLine = editor.document.lineAt(selection.active.line + 1);
            
            // 現在の行の末尾の空白を削除
            const currentLineText = line.text.replace(/\s+$/, '');
            // 次の行の先頭の空白を削除
            const nextLineText = nextLine.text.replace(/^\s+/, '');
            
            // 2行を連結（間にスペースを1つ挿入）
            const newText = currentLineText + ' ' + nextLineText;
            
            // 範囲を削除して新しいテキストを挿入
            const range = new vscode.Range(
                line.range.start,
                nextLine.range.end
            );
            editBuilder.delete(range);
            editBuilder.insert(line.range.start, newText);
        });
    }).then(() => {
        // カーソルを連結後の行の末尾に移動
        editor.selections = editor.selections.map(selection => {
            const line = editor.document.lineAt(selection.active.line);
            return new vscode.Selection(
                line.range.end,
                line.range.end
            );
        });
    });
} 