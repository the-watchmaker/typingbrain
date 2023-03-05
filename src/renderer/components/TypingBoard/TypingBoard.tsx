/* eslint-disable react-hooks/exhaustive-deps */
// HELP REFACTOR needed
// this is a total mess
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import useEditor from 'renderer/hooks/states/useEditor';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';
import useSession from 'renderer/hooks/states/useSession';
import useWrong from 'renderer/hooks/states/useWrong';
import usePractice from 'renderer/hooks/states/usePractice';
import { languageList } from 'renderer/languages/language-list';
import addUnderline from './addUnderline';

import getCursorPosition from './getCursorPosition';
import TypingBlockInfo from './TypingBlockInfo';

const EDITOR_UPDATE_DELAY_MS = 500;

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
  height: 100%;
`;

const ScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .cm-theme-dark {
    .cm-editor {
      width: 100%;
      padding-bottom: calc(100vh - 100px);
      background-color: transparent !important;

      .cm-content {
        white-space: pre-wrap;
        width: calc(100% - 52px);
      }

      .cm-scroller {
        overflow-x: hidden;
      }

      .cm-line:first-of-type {
        font-size: 1.85rem;
        padding-bottom: 0.85rem;
        font-weight: 200 !important;
        color: var(--theme-white) !important;
        * {
          color: var(--theme-white) !important;
        }
      }
    }

    .cm-gutters {
      background-color: transparent !important;
      color: var(--theme-white);
      font-size: 0.85rem;
      line-height: 1.38rem;
      padding: 0 0.5rem;
      min-width: 50px;
      float: left;
    }
  }
`;

const AnswerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .cm-editor {
    .cm-line {
      opacity: 1 !important;
    }
    .cm-layer.cm-selectionLayer {
      z-index: -2 !important;
    }
    .cm-underline {
      // text-decoration: underline 3px red;
      position: relative;
      * {
        color: #ffffff;
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #c70000;
        opacity: 0.75;
        z-index: -2;
      }
    }
  }
`;

const HintWrapper = styled.div<{ gutterWidth: number }>`
  position: relative;
  top: 0;
  left: 0;
  padding-left: ${({ gutterWidth }) => gutterWidth || 0}px;
  width: 100%;
  height: auto;

  .cm-editor {
    .cm-line {
      opacity: 0.32;
    }
    .cm-line:first-of-type {
      opacity: 1;
      font-size: 1.5rem;
      font-weight: 200 !important;
      color: var(--theme-white) !important;
      * {
        color: var(--theme-white) !important;
      }
    }

    .cm-selectionLayer {
      z-index: 1 !important;
    }

    .cm-selectionBackground {
    }
  }
`;

// We use this to save the timeout instance for the editor update
// TODO find the exact type for this
let editorTimeoutInstance: any;

export default function TypingBoard() {
  const {
    lineNumber,
    columnNumber,
    positionNumber,
    setColLn,
    processedText,
    blocks,
    hiddenSelections,
    mode,
    setEditingText,
    editingText,
    updateLastInteracted,
  } = useEditor();

  const { savePractice, currentPractice } = usePractice();
  const { currentSession, updateCurrentSession } = useSession();
  const { currentWrongs, updateCurrentWrongs } = useWrong();

  const [cursorToJumpTo, setCursorToJumpTo] = useState(0);

  const refs = useRef<ReactCodeMirrorRef>({});
  const hintRefs = useRef<ReactCodeMirrorRef>({});
  const answerRefs = useRef<ReactCodeMirrorRef>({});
  const gutterRef = useRef<Element>();

  const [currentBlock, setCurrentBlock] = useState();
  const [hintGutterWidth, setHintGutterWidth] = useState(0);

  const currentLangExt = useMemo(() => {
    const lang = currentPractice?.language || 'text';
    const ext = languageList[lang]?.extension as any;
    return ext;
  }, [currentPractice]);

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

  const hintRefCb = useCallback(
    (current: any) => {
      hintRefs.current = current;

      if (current?.view && hiddenSelections) {
        if (hiddenSelections.length === 1) {
          const { start, end } = hiddenSelections[0];
          current?.view.dispatch({
            selection: EditorSelection.range(start, end),
          });
        } else if (hiddenSelections.length > 1) {
          const editorSelections = hiddenSelections?.map((ops: any) =>
            EditorSelection.range(ops.start, ops.end)
          );
          current?.view.dispatch({
            selection: EditorSelection.create([...editorSelections], 1),
          });
        }
      }
    },
    [hiddenSelections]
  );

  const editorRef = useCallback((current: any) => {
    refs.current = current;
  }, []);

  const answerRef = useCallback((current: any) => {
    answerRefs.current = current;

    const GutterElem = current?.editor?.querySelector('.cm-gutters');
    if (GutterElem) {
      gutterRef.current = GutterElem;
      setHintGutterWidth(GutterElem.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (answerRefs?.current?.view) {
      answerRefs?.current?.view?.dispatch({
        selection: {
          anchor: cursorToJumpTo,
        },
      });
    }
  }, [cursorToJumpTo]);

  useEffect(() => {
    handleGutterWidth();
  }, [lineNumber]);

  const handleWrong = useCallback(() => {
    if (!answerRefs.current?.view) {
      return;
    }
    const wrongs =
      currentWrongs.map(({ from, to }) => {
        return { from, to };
      }) || [];

    addUnderline(answerRefs.current.view as EditorView, wrongs);
  }, [currentWrongs]);

  useEffect(() => {
    handleWrong();
  }, [currentWrongs]);

  useEffect(() => {
    const block = getCurrentBlockByLine(2);
    setCurrentBlock(block || {});
  }, [blocks, mode]);

  const handleOnCursorActivity = (thisRefs: any) => {
    handleWrong();
    updateLastInteracted();

    if (thisRefs.current?.view) {
      const { doc, selection } = thisRefs.current.view.state;
      const {
        lineNumber: lineNum,
        columnNumber: colNum,
        positionNumber: posNum,
      } = getCursorPosition(doc, selection);

      setColLn({
        lineNumber: lineNum,
        columnNumber: colNum,
        positionNumber: posNum,
      });

      if (lineNum !== lineNumber) {
        const block = getCurrentBlockByLine(lineNum);
        setCurrentBlock(block || {});
      }

      handleGutterWidth();
    }

    updateCurrentWrongs();
  };

  const handleEditorChange = (text: string) => {
    setEditingText(text);
    handleOnCursorActivity(refs);

    if (editorTimeoutInstance) {
      clearTimeout(editorTimeoutInstance);
    }

    editorTimeoutInstance = setTimeout(() => {
      savePractice({ text });
    }, EDITOR_UPDATE_DELAY_MS);
  };

  const handleAnswerChange = (answerText: string) => {
    handleOnCursorActivity(answerRefs);
    updateCurrentSession({
      prevAnswerText: currentSession.answerText,
      answerText,
    });
  };

  const lengthLimit = useCallback(
    (tr: any) => {
      if (tr.newDoc.lines === (hintRefs.current?.state?.doc?.lines || 0)) {
        return true;
      }

      if (tr.newDoc.lines !== (hintRefs.current?.state?.doc?.lines || 0)) {
        // eslint-disable-next-line no-underscore-dangle
        const { doc } = tr.startState;

        const text =
          doc.text || (doc.children || []).map((c: any) => c.text).flat();

        const lineText = text[lineNumber - 1] || '';
        const postMore = lineText.length - (columnNumber - 1);
        const nextline = text[lineNumber];

        if (typeof nextline === 'undefined') {
          return false;
        }

        let nextlineLength = nextline.length;
        if (nextline === '') {
          nextlineLength = 0;
        }

        /*
        console.log(doc.text);
        console.log({
          lineText: `${lineText}`,
          lineTextlength: lineText.length,
          columnNumber,
          positionNumber,
          postMore,
          lineNumber,
          nextline: doc.text[lineNumber],
          nextlineLength,
          a: positionNumber + postMore + nextlineLength + 1,
        });
        */

        setCursorToJumpTo(positionNumber + postMore + nextlineLength + 1);
      }

      return false;
    },
    [positionNumber]
  );

  return (
    <TypingBoardWrapper>
      {mode === 'play' && (
        <EditorWrapper>
          <Row height="100%">
            {currentBlock && (
              <Column width="25%">
                <TypingBlockInfo currentBlock={currentBlock} />
              </Column>
            )}
            <Column width="75%">
              <ScrollWrapper>
                <HintWrapper gutterWidth={hintGutterWidth}>
                  <CodeMirror
                    readOnly
                    value={processedText}
                    height="100%"
                    theme="dark"
                    ref={hintRefCb}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    basicSetup={{
                      ...DEFAULT_BASIC_SETUP,
                    }}
                    extensions={[...(currentLangExt ? [currentLangExt] : [])]}
                  />
                  <AnswerWrapper>
                    <CodeMirror
                      autoFocus
                      selection={EditorSelection.cursor(1)}
                      ref={answerRef}
                      value={currentSession?.answerText || ''}
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
                      onClick={() => handleOnCursorActivity(answerRefs)}
                      extensions={[
                        ...(currentLangExt ? [currentLangExt] : []),
                        EditorState.changeFilter.of(lengthLimit),
                      ]}
                      onChange={handleAnswerChange}
                      onKeyDown={() => handleOnCursorActivity(answerRefs)}
                    />
                  </AnswerWrapper>
                </HintWrapper>
              </ScrollWrapper>
            </Column>
          </Row>
        </EditorWrapper>
      )}
      {mode === 'edit' && (
        <EditorWrapper>
          <ScrollWrapper>
            <CodeMirror
              ref={editorRef}
              value={editingText}
              theme="dark"
              style={{
                width: '100%',
              }}
              basicSetup={{
                ...DEFAULT_BASIC_SETUP,
                lineNumbers: true,
                highlightActiveLine: true,
              }}
              onClick={() => handleOnCursorActivity(refs)}
              extensions={[...(currentLangExt ? [currentLangExt] : [])]}
              onChange={handleEditorChange}
              onKeyDown={() => handleOnCursorActivity(refs)}
            />
          </ScrollWrapper>
        </EditorWrapper>
      )}
    </TypingBoardWrapper>
  );
}
