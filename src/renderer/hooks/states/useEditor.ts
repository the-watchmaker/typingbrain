import { useContext } from 'react';
import { globalContext, TMode } from 'renderer/stores';

export default function useEditorText() {
  const { state, dispatch } = useContext(globalContext);

  return {
    ...state.editor,
    updateOriginalText: ({
      processedText,
      blocks,
    }: {
      originalText: string;
      processedText: string;
      blocks: any[];
    }) => {
      dispatch({
        type: 'updateEditorText',
        payload: {
          processedText,
          blocks,
        },
      });
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
    setEditingText: (text: string) => {
      dispatch({
        type: 'updateEditorEditingText',
        payload: {
          editingText: text,
        },
      });
    },
    setMode: (mode: TMode) => {
      dispatch({
        type: 'updateEditorMode',
        payload: {
          mode,
        },
      });
    },
    setPlayData: ({
      processedText,
      blocks,
    }: {
      processedText: string;
      blocks: any[];
    }) => {
      dispatch({
        type: 'updateEditorPlayData',
        payload: {
          processedText,
          blocks,
        },
      });
    },
  };
}
