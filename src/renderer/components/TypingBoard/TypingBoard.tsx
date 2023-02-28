/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

import useEditor from 'renderer/hooks/states/useEditor';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';

import getCursorPosition from './getCursorPosition';
import TypingBlockInfo from './TypingBlockInfo';

const DEFAULT_BASIC_SETUP = {
  lineNumbers: false,
  highlightActiveLineGutter: false,
  foldGutter: false,
  dropCursor: false,
  allowMultipleSelections: false,
  indentOnInput: false,
  bracketMatching: false,
  closeBrackets: false,
  autocompletion: false,
  rectangularSelection: false,
  crosshairCursor: false,
  highlightActiveLine: false,
  highlightSelectionMatches: false,
  closeBracketsKeymap: false,
  searchKeymap: false,
  foldKeymap: false,
  completionKeymap: false,
  lintKeymap: false,
};

const TypingBoardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
    width: 100%;
    background-color: transparent !important;

    .cm-content {
      white-space: pre-wrap;
      width: calc(100% - 52px);
    }

    .cm-scroller {
      overflow-x: hidden;
    }

    .cm-line:first-of-type {
      font-size: 1.5rem;
      padding-top: 5px;
      padding-bottom: 5px;
      font-weight: 200 !important;
      color: var(--theme-white) !important;
      * {
        color: var(--theme-white) !important;
      }
    }
  }

  .cm-theme-dark .cm-gutters {
    background-color: transparent !important;
    color: var(--theme-white);
    font-size: 0.85rem;
    line-height: 1.38rem;
    padding: 0 0.5rem;
    min-width: 50px;
    float: left;
  }
`;

const HintWrapper = styled.div<{ gutterWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: ${({ gutterWidth }) => gutterWidth || 0}px;
  width: 100%;
  height: 100%;
  color: var(--theme-blue);

  .cm-editor {
    .cm-line {
      opacity: 0.45;
      color: var(--theme-blue);
    }
    .cm-line:first-of-type {
      opacity: 1;
      font-size: 1.5rem;
      padding-top: 5px;
      padding-bottom: 5px;
      font-weight: 200 !important;
      color: var(--theme-white) !important;
      * {
        color: var(--theme-white) !important;
      }
    }
  }
`;

export default function TypingBoard() {
  const refs = useRef<ReactCodeMirrorRef>({});
  const gutterRef = useRef<Element>();
  const {
    lineNumber,
    setColLn,
    processedText,
    blocks,
    mode,
    setEditingText,
    editingText,
  } = useEditor();

  const [currentBlock, setCurrentBlock] = useState();
  const [hintGutterWidth, setHintGutterWidth] = useState(0);

  const getCurrentBlockByLine = (lineNum: number) => {
    if (!blocks) {
      return null;
    }
    const found = blocks.find((block: any) => {
      return (
        block.comment && block.lineFrom <= lineNum && block.lineTo >= lineNum
      );
    });
    return found;
  };

  const handleGutterWidth = () => {
    const GutterElem = gutterRef.current;

    if (GutterElem && GutterElem.clientWidth !== hintGutterWidth) {
      setHintGutterWidth(GutterElem.clientWidth);
    }
  };

  const editorRef = useCallback((current: any) => {
    refs.current = current;

    const GutterElem = current?.editor?.querySelector('.cm-gutters');

    if (GutterElem) {
      gutterRef.current = GutterElem;
      setHintGutterWidth(GutterElem.clientWidth);
    }
  }, []);

  useEffect(() => {
    handleGutterWidth();
  }, [lineNumber]);

  useEffect(() => {
    const block = getCurrentBlockByLine(1);
    setCurrentBlock(block || {});
  }, [blocks]);

  const handleOnCursorActivity = () => {
    if (refs.current?.view) {
      const { doc, selection } = refs.current.view.state;
      const { lineNumber: lineNum, columnNumber: colNum } = getCursorPosition(
        doc,
        selection
      );

      setColLn({ lineNumber: lineNum, columnNumber: colNum });

      if (lineNum !== lineNumber) {
        const block = getCurrentBlockByLine(lineNum);
        setCurrentBlock(block || {});
      }

      handleGutterWidth();
    }
  };
  return (
    <TypingBoardWrapper>
      {mode === 'play' && (
        <Row>
          <Column width="72%">
            <HintWrapper gutterWidth={hintGutterWidth}>
              <CodeMirror
                value={processedText}
                height="100%"
                theme="dark"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                basicSetup={{
                  ...DEFAULT_BASIC_SETUP,
                }}
              />
            </HintWrapper>
            <CodeMirror
              ref={editorRef}
              value=""
              height="100%"
              theme="dark"
              style={{
                width: '100%',
                height: '100%',
              }}
              basicSetup={{
                ...DEFAULT_BASIC_SETUP,
                lineNumbers: true,
                highlightActiveLine: true,
              }}
              onClick={handleOnCursorActivity}
              extensions={[javascript({ jsx: true, typescript: true })]}
              onChange={handleOnCursorActivity}
              onKeyDown={handleOnCursorActivity}
            />
          </Column>

          {currentBlock && (
            <Column width="28%">
              <TypingBlockInfo currentBlock={currentBlock} />
            </Column>
          )}
        </Row>
      )}
      {mode === 'edit' && (
        <Row height="100%">
          <CodeMirror
            ref={editorRef}
            value={editingText}
            height="100%"
            theme="dark"
            style={{
              width: '100%',
              height: '100%',
            }}
            basicSetup={{
              ...DEFAULT_BASIC_SETUP,
              lineNumbers: true,
              highlightActiveLine: true,
            }}
            onClick={handleOnCursorActivity}
            extensions={[javascript({ jsx: true, typescript: true })]}
            onChange={(text: string) => {
              handleOnCursorActivity();
              setEditingText(text);
            }}
            onKeyDown={handleOnCursorActivity}
          />
        </Row>
      )}
    </TypingBoardWrapper>
  );
}
