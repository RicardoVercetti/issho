import { useState } from "react";

export function WelcomeScreen({
  onUsernameSubmit,
}: {
  onUsernameSubmit: (name: string) => void;
}) {
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onUsernameSubmit(inputName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome to Issho
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your username to start chatting
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
