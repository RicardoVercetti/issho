import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onConnect: (username: string) => Promise<boolean>;
}

export const LoginPage = ({ onConnect }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsConnecting(true);
      const success = await onConnect(username);
      setIsConnecting(false);
      if (success) {
        navigate('/chat');
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Join Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit" disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      </form>
    </div>
  );
};