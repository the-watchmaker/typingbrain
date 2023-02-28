import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import usePractice from 'renderer/hooks/states/usePractice';
import useEditor from 'renderer/hooks/states/useEditor';
import humanizeDuration from 'humanize-duration';

const TypingFooterWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--theme-blue);
  font-size: 0.8rem;
  padding: 0px 18px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export default function TypingFooter() {
  const { lineNumber, columnNumber, lastInteracted, mode } = useEditor();
  const { currentPractice } = usePractice();

  const lastUpdated = useMemo(() => {
    if (!currentPractice?.updatedAt) {
      return 'New and never saved';
    }

    const duration =
      Date.now() - dayjs(currentPractice?.updatedAt).toDate().getTime();

    if (duration < 5000) {
      return 'Saved just now';
    }

    return `Saved ${humanizeDuration(duration, {
      round: true,
      units: ['y', 'd', 'h', 'm', 's'],
      largest: 1,
    })} ago`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPractice?.updatedAt, lastInteracted]);

  return (
    <TypingFooterWrapper>
      <div>
        {currentPractice?.title} | Ln {lineNumber}, Col {columnNumber}
      </div>
      <div>{mode === 'edit' && <span>{lastUpdated}</span>}</div>
    </TypingFooterWrapper>
  );
}
