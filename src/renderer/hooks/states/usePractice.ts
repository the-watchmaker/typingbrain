import { IPractice } from 'main/models/models';
import { useContext } from 'react';
import {
  getPracticeListIpc,
  createPracticeIpc,
  updatePracticeIpc,
  deletePracticeIpc,
} from 'renderer/controllers/ipc/practiceIpc';
import { globalContext } from 'renderer/stores';

export const extractPracticeTitle = (text: string) => {
  const title = text.split('\n')[0] || 'Untitled';
  return title;
};

export default function useEditorText() {
  const { state, dispatch } = useContext(globalContext);

  const getPracticeList = () => {
    getPracticeListIpc({}, (practiceList: IPractice[]) => {
      dispatch({
        type: 'updatePracticeList',
        payload: {
          practiceList,
        },
      });
    });
  };

  const updateCurrentPractice = (currentPractice: IPractice | null) => {
    dispatch({
      type: 'updateCurrentPractice',
      payload: {
        currentPractice,
      },
    });
  };

  const savePractice = () => {
    const title = extractPracticeTitle(state.editor.editingText);

    if (state.currentPractice?.id) {
      updatePracticeIpc(
        {
          id: state.currentPractice.id,
          title,
          text: state.editor.editingText,
          tags: '',
          language: '',
          metaData: '',
        },
        (args: IPractice) => {
          updateCurrentPractice(args);

          // TODO refactor
          const newPracticeList = state.practiceList?.map((practice) => {
            if (practice.id === state.currentPractice?.id) {
              practice.title = title;
              practice.text = state.editor.editingText;
            }
            return practice;
          });

          dispatch({
            type: 'updatePracticeList',
            payload: {
              practiceList: newPracticeList,
            },
          });
        }
      );
    }
  };

  const createPractice = () => {
    const title = extractPracticeTitle(state.editor.editingText);

    if (!state.currentPractice?.id) {
      createPracticeIpc(
        {
          title,
          text: state.editor.editingText,
          tags: '',
          language: '',
        },
        (createdPractice: IPractice) => {
          updateCurrentPractice(createdPractice);
          getPracticeList();
        }
      );
    }
  };

  const deleteCurrentPractice = (cb?: Function) => {
    if (state.currentPractice?.id) {
      deletePracticeIpc(state.currentPractice?.id as number, () => {
        getPracticeList();
        if (cb) {
          cb();
        }
      });
    }
  };

  return {
    currentPractice: state.currentPractice,
    practiceList: state.practiceList,
    getPracticeList,
    updateCurrentPractice,
    deleteCurrentPractice,
    createPractice,
    savePractice,
  };
}
