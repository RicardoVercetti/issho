// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ChatPage } from './screens/ChatPage';
import { SettingsPage } from './screens/Settings';
import { RoomsPage } from './screens/Rooms';
import { RoomMessagesPage } from './screens/RoomMessagesPage';
import { AppLayout } from './components/AppLayout';
import useUsername from './hooks/useUsername';

export default function App() {
  const { username, saveUsername, clearUsername } = useUsername();

  if (!username) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<WelcomeScreen onUsernameSubmit={saveUsername} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {/* AppLayout wraps all routes that need the sidebar */}
        <Route element={<AppLayout username={username} onSignOut={clearUsername} />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/room/:roomName" element={<RoomMessagesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
