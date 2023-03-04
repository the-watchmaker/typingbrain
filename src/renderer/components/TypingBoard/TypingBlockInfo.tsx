import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const TypingBlockWrapper = styled.div`
  position: relative;
  height: var(--footer-height);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  color: var(--theme-white);
  background-color: var(--theme-bg-dark);
  font-size: 0.9rem;
  padding: 21px;
  white-space: pre-line;
  word-break: break-word;
  font-family: 'inter', monospace;
`;

export default function TypingBlock({ currentBlock }: { currentBlock: any }) {
  return (
    <TypingBlockWrapper>
      <ReactMarkdown linkTarget="_blank">{currentBlock.comment}</ReactMarkdown>
    </TypingBlockWrapper>
  );
}
