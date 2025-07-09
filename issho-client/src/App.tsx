import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useChat } from './hooks/useChat';
import { LoginPage } from './pages/LoginPage';
import { ChatPage } from './pages/ChatPage';

function App() {
  const [serverUrl] = useState('ws://localhost:8080'); // Update with your server URL
  const {
    messages,
    currentRoom,
    isConnected,
    connect,
    joinRoom,
    sendMessage,
    disconnect,
  } = useChat(serverUrl);

  const handleConnect = async (username: string) => {
    const connected = await connect(username);
    if (connected) {
      // For demo, join a default room. In real app, you'd have room selection
      joinRoom('default', username);
    }
    return connected;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onConnect={handleConnect} />}
        />
        <Route
          path="/chat"
          element={
            <ChatPage
              messages={messages}
              currentRoom={currentRoom}
              onSendMessage={sendMessage}
              onDisconnect={disconnect}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;