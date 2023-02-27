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
  };
  fileList: [] | null;
  currentFile: {
    id: string;
    name: string;
  } | null;
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
