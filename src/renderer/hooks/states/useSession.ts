import { ISessionPartial } from 'main/models/models';
import { useContext } from 'react';
// import { getPracticeIpc } from 'renderer/controllers/ipc/practiceIpc';
import { globalContext } from 'renderer/stores';
import getWrongParts, { IWrong } from 'renderer/lib/getWrongParts';

export const extractPracticeTitle = (text: string) => {
  const title = text.split('\n')[0] || 'Untitled';
  return title;
};

export default function useSession() {
  const { state, dispatch } = useContext(globalContext);

  const updateCurrentSession = (currentSession: ISessionPartial) => {
    // TODO MOVE THIS OUT OF HERE
    const currentWrongs: IWrong[] = getWrongParts(
      currentSession.answerText as string,
      state.editor.processedText as string
    );

    dispatch({
      type: 'updateCurrentSession',
      payload: {
        currentSession,
      },
    });

    dispatch({
      type: 'updateCurrentWrongs',
      payload: {
        currentWrongs,
      },
    });
  };

  return {
    currentSession: state.currentSession,
    updateCurrentSession,
  };
}
