import { EditorView } from '@codemirror/view';

export default function getCursorPosition(
  doc: EditorView['state']['doc'],
  selection: EditorView['state']['selection']
) {
  const lineNumber = doc.lineAt(selection.main.head).number;
  const columnNumber =
    selection.ranges[0].head - doc.lineAt(selection.main.head).from;

  return { lineNumber, columnNumber };
}
