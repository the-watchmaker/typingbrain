import { useMemo } from 'react';
import styled from 'styled-components';
import Button from 'renderer/components/ui/Button';
import useEditor from 'renderer/hooks/states/useEditor';
import useSession from 'renderer/hooks/states/useSession';
import usePractice from 'renderer/hooks/states/usePractice';
import ColumnBetween from 'renderer/components/ui/ColumnBetween';
import { MdOutlineAdd, MdOutlineSave } from 'react-icons/md';
import { BsTrash, BsPlayFill } from 'react-icons/bs';
import Select from 'renderer/components/ui/Select';
import Column from 'renderer/components/ui/Column';

import {
  languageList,
  languageOptions,
} from 'renderer/languages/language-list';
import createSessionText from './createSessionText';

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
  const { updateCurrentSession } = useSession();

  const {
    updateCurrentPractice,
    createPractice,
    deleteCurrentPractice,
    currentPractice,
    savePractice,
  } = usePractice();

  const language = useMemo(() => {
    const lang = currentPractice?.language || 'text';
    return languageList[lang];
  }, [currentPractice]);

  const handlePlay = () => {
    if (editingText) {
      const { text, blocks, hiddenSelections } = parseText(
        editingText,
        currentPractice?.language || 'text'
      );
      setPlayData({ processedText: text, blocks, hiddenSelections });
      updateCurrentSession({
        answerText: createSessionText(blocks),
      });
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

  const handleLanguageChange = (value: any) => {
    savePractice({
      language: value.value as string,
    });
  };

  return (
    <TypingControllerWrapper>
      <ColumnBetween>
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
        <ColumnBetween width="calc(100% - 280px)">
          <Column width="250px">
            {mode === 'edit' && (
              <Select
                value={language.code}
                options={languageOptions}
                onChange={handleLanguageChange}
              />
            )}
          </Column>
          {mode === 'edit' && editingText && (
            <Button onClick={handlePlay}>
              Start{'  '}
              <span style={{ fontSize: '1rem', lineHeight: '0.25rem' }}>
                <BsPlayFill />
              </span>
            </Button>
          )}
          {mode === 'play' && <Button onClick={handleEdit}>Done</Button>}
        </ColumnBetween>
      </ColumnBetween>
    </TypingControllerWrapper>
  );
}
