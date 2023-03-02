import styled from 'styled-components';
import Button from 'renderer/components/ui/Button';
import useEditor from 'renderer/hooks/states/useEditor';
import usePractice from 'renderer/hooks/states/usePractice';
import Row from 'renderer/components/ui/Row';
import ColumnBetween from 'renderer/components/ui/ColumnBetween';
import { MdOutlineAdd, MdOutlineSave } from 'react-icons/md';
import { BsTrash, BsPlayFill } from 'react-icons/bs';
import IconButton from '../ui/IconButton';

import parseText from './parseText';

const TypingControllerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  background-color: var(--theme-bg-light);
  border-bottom: 1px solid var(--theme-bg-lighter);
`;

export default function TypingController() {
  const { mode, editingText, setPlayData, setMode, setEditingText } =
    useEditor();
  const {
    updateCurrentPractice,
    createPractice,
    deleteCurrentPractice,
    currentPractice,
  } = usePractice();

  const handlePlay = () => {
    if (editingText) {
      const { text, blocks, hiddenSelections } = parseText(editingText);
      setPlayData({ processedText: text, blocks, hiddenSelections });
      setMode('play');
    }
  };

  const handleEdit = () => {
    setMode('edit');
  };

  const handleNew = () => {
    setMode('edit');
    setEditingText('');
    updateCurrentPractice(null);
  };

  const handleDelete = () => {
    deleteCurrentPractice(() => {
      setEditingText('');
      updateCurrentPractice(null);
    });
  };

  const handleSave = () => {
    createPractice();
  };

  return (
    <TypingControllerWrapper>
      <Row>
        <ColumnBetween width="260px">
          {mode === 'edit' && currentPractice?.id && (
            <IconButton onClick={handleNew}>
              <MdOutlineAdd />
            </IconButton>
          )}
          {mode === 'edit' && !currentPractice?.id && (
            <IconButton onClick={handleSave}>
              <MdOutlineSave />
            </IconButton>
          )}
          {mode === 'edit' && currentPractice?.id && (
            <IconButton onClick={handleDelete} fontSize="1rem">
              <BsTrash />
            </IconButton>
          )}
        </ColumnBetween>
      </Row>
      {mode === 'edit' && editingText && (
        <Button onClick={handlePlay}>
          Start{'  '}
          <span style={{ fontSize: '1rem', lineHeight: '0.25rem' }}>
            <BsPlayFill />
          </span>
        </Button>
      )}
      {mode === 'play' && <Button onClick={handleEdit}>Done</Button>}
    </TypingControllerWrapper>
  );
}
