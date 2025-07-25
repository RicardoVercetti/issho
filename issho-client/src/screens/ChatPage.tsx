// screens/ChatPage.tsx
export function ChatPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="border border-gray-200 rounded-lg p-4 h-96 mb-6 overflow-y-auto">
        <p className="text-gray-500 text-center py-10">
          This is your chat area. Messages will appear here.
        </p>
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200">
          Send
        </button>
      </div>
    </div>
  );
}
