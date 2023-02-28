import { IPractice } from 'main/models/models';
import { useContext } from 'react';
import {
  getPracticeListIpc,
  createPracticeIpc,
  updatePracticeIpc,
} from 'renderer/controllers/ipc/practiceIpc';
import { globalContext } from 'renderer/stores';

export default function useEditorText() {
  const { state, dispatch } = useContext(globalContext);

  const getPracticeList = () => {
    getPracticeListIpc({}, (practiceList: IPractice[]) => {
      console.log('LIST:', practiceList);

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

  return {
    currentPractice: state.currentPractice,
    practiceList: state.practiceList,
    getPracticeList,
    updatePracticeList: (practiceList: IPractice[]) => {
      dispatch({
        type: 'updatePracticeList',
        payload: {
          practiceList,
        },
      });
    },
    updateCurrentPractice,
    savePractice() {
      const title =
        (state.editor.editingText || '').split('\n')[0] || 'Untitled';

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
      } else {
        updatePracticeIpc(
          {
            id: state.currentPractice.id,
            title,
            text: state.editor.editingText,
            tags: '',
            language: '',
            metaData: '',
          },
          () => {
            getPracticeList();
          }
        );
      }
    },
  };
}
