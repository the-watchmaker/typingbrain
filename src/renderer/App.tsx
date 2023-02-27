import { useReducer, useMemo } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { initialState, reducer, globalContext } from 'renderer/stores';
import TypingScreen from './screens/Typing/TypingScreen';
import Theme from './Theme';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      <Theme mode="default">
        <Router>
          <Routes>
            <Route path="/" element={<TypingScreen />} />
          </Routes>
        </Router>
      </Theme>
    </globalContext.Provider>
  );
}
