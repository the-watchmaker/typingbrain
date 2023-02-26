import { useState, useRef } from 'react';
import styled from 'styled-components';

import { ICursorPosition } from 'renderer/types';

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import parseText from './parseText';

import getCursorPosition from './getCursorPosition';
import TypingFooter from './TypingFooter';
import TypingBlockInfo from './TypingBlockInfo';

const TypingBoardWrapper = styled.div`
  width: 100%;
  height: calc(100% - (var(--header-height) + var(--footer-height)));
  textarea {
    width: 68%;
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

const HintWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.45;
  color: var(--theme-blue);

  .cm-editor {
    color: var(--theme-blue);
  }
`;

const TEMP = `// This program calculates the nth Fibonacci number recursively
package main // declares that this file is part of the main package, which is the entry point for the program

import "fmt" // imports the "fmt" package, which provides functions for formatting and printing strings

// The fibonacci function recursively calculates the nth Fibonacci number
func fibonacci(n int) int {
    if n <= 1 { // if n is less than or equal to 1
        return n // return n
    }
    return fibonacci(n-1) + fibonacci(n-2) // otherwise, recursively call the fibonacci function with n-1 and n-2 and return their sum
}

func main() {
    n := 10 // set the value of n to 10
    // Call the fibonacci function and print the result to the console
    // The %d and %s are placeholders for the values of n and fibonacci(n), respectively
    fmt.Printf("The %dth Fibonacci number is %d", n, fibonacci(n))
}
`;

const TEMP_STRIP = parseText(TEMP);

console.log(TEMP_STRIP);

const getCurrentBlockByLine = (lineNumber: number) => {
  const found = TEMP_STRIP.blocks.find((block: any) => {
    return block.lineFrom <= lineNumber && block.lineTo >= lineNumber;
  });

  return found;
};

export default function TypingBoard() {
  const refs = useRef<ReactCodeMirrorRef>({});

  const [cursorPosition, setCursorPosition] = useState<ICursorPosition>({
    lineNumber: 0,
    columnNumber: 0,
  });

  const [currentBlock, setCurrentBlock] = useState();

  const handleOnCursorActivity = () => {
    if (refs.current?.view) {
      const { doc, selection } = refs.current.view.state;
      const { lineNumber, columnNumber } = getCursorPosition(doc, selection);

      const block = getCurrentBlockByLine(lineNumber);

      setCurrentBlock(block || {});

      setCursorPosition({ lineNumber, columnNumber });
    }
  };

  const handleOnClick = () => {
    handleOnCursorActivity();
  };

  return (
    <TypingBoardWrapper>
      <HintWrapper>
        <CodeMirror
          value={TEMP_STRIP.text}
          height="100%"
          theme="dark"
          style={{
            width: '100%',
            height: '100%',
          }}
          basicSetup={false}
        />
      </HintWrapper>
      <CodeMirror
        ref={refs}
        value={''}
        height="100%"
        theme="dark"
        style={{
          width: '100%',
          height: '100%',
        }}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: true,
          autocompletion: false,
          closeBrackets: false,
        }}
        onClick={handleOnClick}
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={handleOnCursorActivity}
        onKeyDown={handleOnCursorActivity}
      />

      {currentBlock && <TypingBlockInfo currentBlock={currentBlock} />}

      <TypingFooter cursorPosition={cursorPosition} />
    </TypingBoardWrapper>
  );
}
