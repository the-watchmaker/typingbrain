import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import TypingScreen from './screens/Typing/TypingScreen';
import Theme from './Theme';

export default function App() {
  return (
    <Theme mode="default">
      <Router>
        <Routes>
          <Route path="/" element={<TypingScreen />} />
        </Routes>
      </Router>
    </Theme>
  );
}
