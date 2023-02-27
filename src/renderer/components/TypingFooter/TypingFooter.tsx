import styled from 'styled-components';
import useEditor from 'renderer/hooks/states/useEditor';

const TypingFooterWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--theme-blue);
  font-size: 0.8rem;
  padding: 0px 18px;
  align-items: center;
  display: flex;
`;

export default function TypingFooter() {
  const { lineNumber, columnNumber } = useEditor();

  return (
    <TypingFooterWrapper>
      <div>
        Ln {lineNumber}, Col {columnNumber}
      </div>
    </TypingFooterWrapper>
  );
}
