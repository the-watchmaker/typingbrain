import styled from 'styled-components';

const TypingBlockWrapper = styled.div`
  position: absolute;
  height: var(--footer-height);
  width: 32%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: var(--theme-bg-light);
  font-size: 1rem;
  padding: 15px;
  white-space: pre-line;
  font-family: 'Inter', monospace;
`;

export default function TypingBlock({ currentBlock }: { currentBlock: any }) {
  return (
    <TypingBlockWrapper>
      <div>{currentBlock.comment}</div>
    </TypingBlockWrapper>
  );
}
