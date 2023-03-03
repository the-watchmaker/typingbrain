import { IPractice, ISessionPartial } from 'main/models/models';
import { useContext } from 'react';
import {
  getPracticeIpc,
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

  const getPractice = (id: number, cb?: Function) => {
    getPracticeIpc(id, (practice: IPractice) => {
      updateCurrentPractice(practice);

      if (cb) {
        cb(practice);
      }
    });
  };

  const savePractice = (practice: any) => {
    const title = extractPracticeTitle(
      practice.text || state.editor.editingText
    );

    if (state.currentPractice?.id) {
      updatePracticeIpc(
        {
          ...state.currentPractice,
          ...practice,
          title,
        },
        (updatePractice: IPractice) => {
          updateCurrentPractice({
            ...state.currentPractice,
            ...updatePractice,
            // TODO: metaData and Tags
            metaData: '',
            tags: '',
          });

          // TODO refactor
          const newPracticeList = state.practiceList?.map((thisPractice) => {
            if (thisPractice.id === state.currentPractice?.id) {
              thisPractice.title = title;
              thisPractice.text = state.editor.editingText;
            }
            return thisPractice;
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
          metaData: '',
          authorId: 0,
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

  const updateCurrentSession = (currentSession: ISessionPartial) => {
    dispatch({
      type: 'updateCurrentSession',
      payload: {
        currentSession,
      },
    });
  };

  return {
    currentPractice: state.currentPractice,
    practiceList: state.practiceList,
    getPractice,
    getPracticeList,
    updateCurrentSession,
    updateCurrentPractice,
    deleteCurrentPractice,
    createPractice,
    savePractice,
  };
}
