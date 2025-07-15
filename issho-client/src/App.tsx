// import { useState, useEffect } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomePage } from './screens/HomeScreen';
import useUsername from './hooks/useUsername';

export default function App() {
  const { username, saveUsername, clearUsername } = useUsername();

  if (!username) {
    return <WelcomeScreen onUsernameSubmit={saveUsername} />;
  }

  return <HomePage username={username} onSignOut={clearUsername} />;
}



