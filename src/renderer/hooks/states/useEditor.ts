import { useContext } from 'react';
import { globalContext } from 'renderer/stores';
import { TMode } from 'main/models/models';

export default function useEditorText() {
  const { state, dispatch } = useContext(globalContext);

  const setEditingText = (text: string) => {
    dispatch({
      type: 'updateEditorEditingText',
      payload: {
        editingText: text,
      },
    });
  };

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
    setEditingText,
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
