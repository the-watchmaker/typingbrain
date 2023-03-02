import { IPractice } from 'main/models/models';
import { Dispatch, createContext } from 'react';

export type TMode = 'edit' | 'play' | 'view';

export interface IUIState {
  editor: {
    fontSize: number;
    fontFamily: string;
    language: string;
    theme: string;
    lineNumber: number;
    columnNumber: number;
    positionNumber: number;
    showLineNumbers: boolean;
    showGutter: boolean;
    lastInteracted: number;
    // values
    editingText: string;
    processedText?: string;
    blocks?: any[];
    hiddenSelections?: any[];
    mode: TMode;
  };
  practiceList: IPractice[] | null;
  currentPractice: IPractice | null;
}

export const DEFAULT_STATE = {
  editor: {
    fontSize: 16,
    fontFamily: 'monospace',
    language: 'Go',
    theme: 'monokai',
    lineNumber: 1,
    columnNumber: 1,
    positionNumber: 0,
    showLineNumbers: true,
    showGutter: true,
    mode: 'edit' as TMode,
    editingText: '',
    lastInteracted: 0,
  },
  practiceList: [],
  currentPractice: null,
};

export const initialState: IUIState = {
  ...DEFAULT_STATE,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateEditorLastInteracted':
      return {
        ...state,
        editor: {
          ...state.editor,
          lastInteracted: action.payload.lastInteracted,
        },
      };
    case 'updateEditorColLn':
      return {
        ...state,
        editor: {
          ...state.editor,
          lineNumber: action.payload.lineNumber,
          columnNumber: action.payload.columnNumber,
          positionNumber: action.payload.positionNumber,
        },
      };
    case 'updateEditorText':
      return {
        ...state,
        editor: {
          ...state.editor,
          processedText: action.payload.processedText,
          blocks: action.payload.blocks,
        },
      };
    case 'updateEditorEditingText':
      return {
        ...state,
        editor: {
          ...state.editor,
          editingText: action.payload.editingText,
        },
      };
    case 'updateEditorMode':
      return {
        ...state,
        editor: {
          ...state.editor,
          mode: action.payload.mode,
        },
      };
    case 'updateEditorPlayData':
      return {
        ...state,
        editor: {
          ...state.editor,
          hiddenSelections: action.payload.hiddenSelections,
          processedText: action.payload.processedText,
          blocks: action.payload.blocks,
        },
      };
    case 'updatePracticeList':
      return {
        ...state,
        practiceList: action.payload.practiceList,
      };
    case 'updateCurrentPractice':
      return {
        ...state,
        currentPractice: action.payload.currentPractice,
      };
    default:
  }

  return state;
};

export const globalContext = createContext<{
  state: IUIState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
