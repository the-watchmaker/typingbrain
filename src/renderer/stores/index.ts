import { IPractice, IEditor, ISession, TMode } from 'main/models/models';
import { Dispatch, createContext } from 'react';

export interface IUIState {
  editor: IEditor;
  practiceList: IPractice[] | null;
  currentPractice: IPractice | null;
  currentSession: ISession;
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
  currentSession: {
    prevAnswerText: '\n',
    answerText: '\n',
    completion: 0,
    wrong: 0,
    cursorPosition: 0,
    column: 1,
    line: 1,
  },
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
    case 'updateCurrentSession':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          ...action.payload.currentSession,
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
