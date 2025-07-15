import { useState, useEffect } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomePage } from './screens/HomeScreen';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if username exists in localStorage when component mounts
    const savedUsername = localStorage.getItem('issho-username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleUsernameSubmit = (name: string) => {
    localStorage.setItem('issho-username', name);
    setUsername(name);
  };

  if (!username) {
    return <WelcomeScreen onUsernameSubmit={handleUsernameSubmit} />;
  }

  return <HomePage username={username} />;
}



