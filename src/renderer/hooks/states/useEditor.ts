import { useContext } from 'react';
import { globalContext, TMode } from 'renderer/stores';

export default function useEditorText() {
  const { state, dispatch } = useContext(globalContext);

  return {
    ...state.editor,
    updateLastInteracted: () => {
      dispatch({
        type: 'updateEditorLastInteracted',
        payload: {
          lastInteracted: new Date().getTime(),
        },
      });
    },
    updateOriginalText: ({
      processedText,
      blocks,
    }: {
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
      positionNumber,
    }: {
      lineNumber: number;
      columnNumber: number;
      positionNumber: number;
    }) => {
      dispatch({
        type: 'updateEditorColLn',
        payload: {
          lineNumber,
          columnNumber,
          positionNumber,
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
      hiddenSelections,
      processedText,
      blocks,
    }: {
      hiddenSelections: any[];
      processedText: string;
      blocks: any[];
    }) => {
      dispatch({
        type: 'updateEditorPlayData',
        payload: {
          hiddenSelections,
          processedText,
          blocks,
        },
      });
    },
  };
}
