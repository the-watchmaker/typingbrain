import styled from 'styled-components';
import { useEffect } from 'react';
import { IPractice } from 'main/models/models';
import SideNav from 'renderer/components/SideNav/SideNav';
import usePractice from 'renderer/hooks/states/usePractice';
import useEditor from 'renderer/hooks/states/useEditor';

const PracticeItem = styled.div`
  font-size: 0.85rem;
  border-bottom: 1px solid #e5e5e5;
  padding: 15px 15px;
`;

export default function FileNav() {
  const {
    practiceList = [],
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
      <div>FileNav</div>
      {practiceList?.map((practice: IPractice) => {
        return (
          <PracticeItem
            key={practice.id}
            onClick={() => {
              handleSelectPractice(practice);
              setEditingText(practice.text);
            }}
          >
            {practice.id}: {practice.title}
          </PracticeItem>
        );
      })}
    </SideNav>
  );
}
