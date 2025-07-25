// screens/RoomMessagesPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useUsername from '../hooks/useUsername';

interface Message {
  username: string;
  message: string;
  time?: string;
}

export function RoomMessagesPage() {
  const { roomName } = useParams();
  const { username } = useUsername();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = () => {
    fetch(`http://localhost:4000/allMessage/${roomName}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages(); // initial load
    const interval = setInterval(fetchMessages, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, [roomName]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setSending(true);
    fetch('http://localhost:4000/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_name: roomName,
        username,
        message: newMessage.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then(err => { throw new Error(err.message) });
        return res.json();
      })
      .then(() => {
        setNewMessage('');
        fetchMessages(); // update immediately after send
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const formatTime = (iso?: string) => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Top bar */}
      <div className="bg-green-600 text-white px-6 py-3 text-xl font-semibold shadow-md">
        Room: {roomName}
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
        {loading && <p className="text-gray-500">Loading messages...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && messages.length === 0 && (
          <p className="text-gray-500">No messages yet.</p>
        )}

        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <strong className="text-blue-600">{msg.username}</strong>
                <span className="text-sm text-gray-400">{formatTime(msg.time)}</span>
              </div>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Send message section */}
      <div className="border-t p-3 flex gap-2 bg-white">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          onClick={handleSendMessage}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
