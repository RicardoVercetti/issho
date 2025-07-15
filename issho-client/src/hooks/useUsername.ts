// src/hooks/useUsername.ts
import { useState, useEffect } from 'react';

export default function useUsername() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('issho-username');
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const saveUsername = (name: string) => {
    localStorage.setItem('issho-username', name);
    setUsername(name);
  };

  const clearUsername = () => {
    localStorage.removeItem('issho-username');
    setUsername(null);
  };

  return { username, saveUsername, clearUsername };
}