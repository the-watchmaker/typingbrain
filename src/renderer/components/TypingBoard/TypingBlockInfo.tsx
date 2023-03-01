import styled from 'styled-components';

const TypingBlockWrapper = styled.div`
  position: relative;
  height: var(--footer-height);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: var(--theme-bg-dark);
  font-size: 0.85rem;
  padding: 21px;
  white-space: pre-line;
  word-break: break-word;
  font-family: 'inter', monospace;
`;

export default function TypingBlock({ currentBlock }: { currentBlock: any }) {
  return (
    <TypingBlockWrapper>
      <div>{currentBlock.comment}</div>
    </TypingBlockWrapper>
  );
}
