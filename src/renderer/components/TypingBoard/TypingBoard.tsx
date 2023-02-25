import { useState, useRef } from 'react';
import styled from 'styled-components';

import { ICursorPosition } from 'renderer/types';

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import getCursorPosition from './getCursorPosition';
import TypingFooter from './TypingFooter';

const TypingBoardWrapper = styled.div`
  width: 100%;
  height: calc(100% - (var(--header-height) + var(--footer-height)));
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: var(--theme-color);
    outline: none;
    border: none;
    resize: none;
    font-size: 1.25rem;
  }

  .cm-editor {
    background-color: transparent !important;
  }
`;

export default function TypingBoard() {
  const refs = useRef<ReactCodeMirrorRef>({});

  const [cursorPosition, setCursorPosition] = useState<ICursorPosition>({
    lineNumber: 0,
    columnNumber: 0,
  });

  const handleOnCursorActivity = () => {
    if (refs.current?.view) {
      const { doc, selection } = refs.current.view.state;
      const { lineNumber, columnNumber } = getCursorPosition(doc, selection);
      setCursorPosition({ lineNumber, columnNumber });
    }
  };

  const handleOnClick = () => {
    handleOnCursorActivity();
  };

  return (
    <TypingBoardWrapper>
      <CodeMirror
        ref={refs}
        value="console.log('hello world!');"
        height="100%"
        theme="dark"
        style={{
          width: '100%',
          height: '100%',
        }}
        basicSetup={false}
        onClick={handleOnClick}
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={handleOnCursorActivity}
        onKeyDown={handleOnCursorActivity}
      />
      <TypingFooter cursorPosition={cursorPosition} />
    </TypingBoardWrapper>
  );
}
