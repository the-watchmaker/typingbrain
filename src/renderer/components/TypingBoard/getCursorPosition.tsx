import { EditorView } from '@codemirror/view';

export default function getCursorPosition(
  doc: EditorView['state']['doc'],
  selection: EditorView['state']['selection']
) {
  const positionNumber = selection.main.head;
  const lineNumber = doc.lineAt(positionNumber).number;
  const columnNumber =
    selection.ranges[0].head - doc.lineAt(selection.main.head).from + 1;

  return { lineNumber, columnNumber, positionNumber };
}
