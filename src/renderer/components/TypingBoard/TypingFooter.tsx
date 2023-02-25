import styled from 'styled-components';
import { ICursorPosition } from 'renderer/types';

const TypingFooterWrapper = styled.div`
  position: absolute;
  height: var(--footer-height);
  width: 100%;
  background-color: var(--theme-blue);
  font-size: 0.85rem;
  padding: 3px 10px;
`;

export default function TypingFooter({
  cursorPosition,
}: {
  cursorPosition: ICursorPosition;
}) {
  return (
    <TypingFooterWrapper>
      <div>
        Ln {cursorPosition.lineNumber}, Col {cursorPosition.columnNumber}
      </div>
    </TypingFooterWrapper>
  );
}
