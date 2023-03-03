import { ISessionPartial } from 'main/models/models';
import { useContext } from 'react';
// import { getPracticeIpc } from 'renderer/controllers/ipc/practiceIpc';
import { globalContext } from 'renderer/stores';

export const extractPracticeTitle = (text: string) => {
  const title = text.split('\n')[0] || 'Untitled';
  return title;
};

export default function useSession() {
  const { state, dispatch } = useContext(globalContext);

  const updateCurrentSession = (currentSession: ISessionPartial) => {
    dispatch({
      type: 'updateCurrentSession',
      payload: {
        currentSession,
      },
    });
  };

  return {
    currentSession: state.currentSession,
    updateCurrentSession,
  };
}
