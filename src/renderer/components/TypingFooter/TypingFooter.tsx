import styled from 'styled-components';
import useEditorColLn from 'renderer/hooks/states/useEditorColLn';

const TypingFooterWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--theme-blue);
  font-size: 0.85rem;
  padding: 3px 10px;
`;

export default function TypingFooter() {
  const { cursorPosition } = useEditorColLn();

  return (
    <TypingFooterWrapper>
      <div>
        Ln {cursorPosition.lineNumber}, Col {cursorPosition.columnNumber}
      </div>
    </TypingFooterWrapper>
  );
}
