import { IPractice } from 'main/models/models';
import { Dispatch, createContext } from 'react';

export interface IUIState {
  editor: {
    fontSize: number;
    fontFamily: string;
    language: string;
    theme: string;
    lineNumber: number;
    columnNumber: number;
    showLineNumbers: boolean;
    showGutter: boolean;
    // values
    editingText: string;
    processedText?: string;
    blocks?: any[];
    mode: 'edit' | 'play' | 'view';
  };
  fileList: [] | null;
  currentFile: IPractice | null;
}

export const DEFAULT_STATE = {
  editor: {
    fontSize: 16,
    fontFamily: 'monospace',
    language: 'Go',
    theme: 'monokai',
    lineNumber: 1,
    columnNumber: 1,
    showLineNumbers: true,
    showGutter: true,
    mode: 'edit' as 'edit' | 'play' | 'view',
    editingText: '',
  },
  fileList: null,
  flleListMounted: false,
  currentFile: null,
};

export const initialState: IUIState = {
  ...DEFAULT_STATE,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateEditorColLn':
      return {
        ...state,
        editor: {
          ...state.editor,
          lineNumber: action.payload.lineNumber,
          columnNumber: action.payload.columnNumber,
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
          processedText: action.payload.processedText,
          blocks: action.payload.blocks,
        },
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
