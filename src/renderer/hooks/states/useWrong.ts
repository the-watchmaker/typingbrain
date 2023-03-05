import { useContext } from 'react';
import { globalContext } from 'renderer/stores';
import getWrongParts, { IWrong } from 'renderer/lib/getWrongParts';

export default function useWrong() {
  const { state, dispatch } = useContext(globalContext);

  const handleWrong = () => {
    const wrongs: IWrong[] = getWrongParts(
      state.currentSession.answerText as string,
      state.editor.processedText as string
    );

    return wrongs;
  };

  const updateCurrentWrongs = () => {
    const currentWrongs = handleWrong();

    dispatch({
      type: 'updateCurrentWrongs',
      payload: {
        currentWrongs,
      },
    });
  };

  return {
    currentWrongs: state.currentWrongs,
    updateCurrentWrongs,
  };
}
