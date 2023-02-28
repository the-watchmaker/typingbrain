import styled from 'styled-components';
import { useEffect } from 'react';
import { IPractice } from 'main/models/models';
import SideNav from 'renderer/components/SideNav/SideNav';
import usePractice from 'renderer/hooks/states/usePractice';
import useEditor from 'renderer/hooks/states/useEditor';

const PracticeNav = styled.div`
  padding: 10px 10px 70vh 10px;
`;

const PracticeItem = styled.div<{ selected: boolean }>`
  font-size: 0.85rem;
  padding: 10px 7px;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.selected ? 'var(--theme-item-bg-selected)' : 'var(--theme-item-bg)'};
  &:hover {
    background-color: var(--theme-item-bg-hover);
  }
`;

export default function FileNav() {
  const {
    practiceList = [],
    currentPractice,
    getPracticeList,
    updateCurrentPractice,
  } = usePractice();

  const { setEditingText } = useEditor();

  useEffect(() => {
    getPracticeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPractice = (practice: IPractice) => {
    updateCurrentPractice(practice);
  };

  return (
    <SideNav>
      <PracticeNav>
        {practiceList?.map((practice: IPractice) => {
          return (
            <PracticeItem
              key={practice.id}
              onClick={() => {
                handleSelectPractice(practice);
                setEditingText(practice.text);
              }}
              selected={practice.id === currentPractice?.id}
            >
              {practice.id}: {practice.title}
            </PracticeItem>
          );
        })}
      </PracticeNav>
    </SideNav>
  );
}
