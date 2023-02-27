import { useContext } from 'react';
import { globalContext } from 'renderer/stores';

export default function useEditorColLn() {
  const { state, dispatch } = useContext(globalContext);

  return {
    cursorPosition: {
      lineNumber: state.editor.lineNumber,
      columnNumber: state.editor.columnNumber,
    },
    setColLn: ({
      lineNumber,
      columnNumber,
    }: {
      lineNumber: number;
      columnNumber: number;
    }) => {
      dispatch({
        type: 'updateEditorColLn',
        payload: {
          lineNumber,
          columnNumber,
        },
      });
    },
  };
}
