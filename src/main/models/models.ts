export type TCreatedOrigin = 'APP' | 'WEB' | 'MOB';

export type TMode = 'edit' | 'play' | 'view';

export interface IPractice {
  id?: number;
  title: string;
  authorId: number;
  text: string;
  tags: string;
  folderId?: number;
  createdOrigin?: string;
  language?: string;
  metaData: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deleted?: number;
}
export interface ISession {
  prevAnswerText: string;
  answerText: string;
  completion: number;
  wrong: number;
  startTime?: number;
  endTime?: number;
  cursorPosition: number;
  column: number;
  line: number;
}

export interface ISessionPartial {
  prevAnswerText?: string;
  answerText?: string;
  completion?: number;
  wrong?: number;
  startTime?: number;
  endTime?: number;
  cursorPosition?: number;
  column?: number;
  line?: number;
}

export interface IEditor {
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
}
