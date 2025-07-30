// screens/RoomMessagesPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import useUsername from "../hooks/useUsername";

interface BaseMessage {
  username: string;
  time?: string;
  type: "text" | "file";
}

interface TextMessage extends BaseMessage {
  type: "text";
  message: string;
}

interface FileMessage extends BaseMessage {
  type: "file";
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

type Message = TextMessage | FileMessage;

export function RoomMessagesPage() {
  const { roomName } = useParams();
  const { username } = useUsername();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = useCallback(() => {
    fetch(`http://localhost:4000/allMessage/${roomName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [roomName]);

  useEffect(() => {
    fetchMessages(); // initial load
    const interval = setInterval(fetchMessages, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setSending(true);
    fetch("http://localhost:4000/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: roomName,
        username,
        message: newMessage.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        return res.json();
      })
      .then(() => {
        setNewMessage("");
        fetchMessages(); // update immediately after send
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const handleFileUpload = (file: File) => {
    if (!roomName || !username) {
      alert("Room name or username missing");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);

    fetch(`http://localhost:4000/upload/${roomName}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Upload failed");
          });
        }
        return res.json();
      })
      .then(() => {
        fetchMessages(); // Refresh messages
      })
      .catch((err) => {
        alert(`File upload error: ${err.message}`);
      });
  };

  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen relative">
      {/* Top bar */}
      <div className="bg-green-600 text-white px-6 py-3 text-xl font-semibold shadow-md">
        Room: {roomName}
      </div>

      {/* Drag Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-green-100 bg-opacity-75 z-10 flex justify-center items-center pointer-events-none">
          <p className="text-green-700 text-xl font-semibold">
            Drop file to upload 📎
          </p>
        </div>
      )}

      {/* Message list */}
      <div
        className={`flex-1 overflow-y-auto px-4 py-3 transition-all duration-200 ${
          isDragging
            ? "bg-green-50 border-2 border-dashed border-green-400"
            : "bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
                <span className="text-sm text-gray-400">
                  {formatTime(msg.time)}
                </span>
              </div>
              {msg.type === "text" && (
                <p className="text-gray-700">{msg.message}</p>
              )}
              {msg.type === "file" && (
                <div className="text-gray-700">
                  📎{" "}
                  <a
                    href={`http://localhost:4000/uploads/${msg.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {msg.originalName}
                  </a>{" "}
                  ({(msg.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Send message section */}
      <div className="border-t p-3 flex gap-2 bg-white items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
              e.target.value = ""; // Reset file input after selection
            }
          }}
        />
        <label
          htmlFor="file-upload"
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition"
        >
          📎
        </label>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          onClick={handleSendMessage}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
