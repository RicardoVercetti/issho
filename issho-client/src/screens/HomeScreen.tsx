interface HomePageProps {
  username: string;
  onSignOut: () => void;  // Changed from handleSignOut to onSignOut
}

export function HomePage({ username, onSignOut }: HomePageProps) {

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Issho Chat</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Welcome,</span>
              <span className="font-semibold">{username}</span>
            </div>
            <button
              onClick={onSignOut}
              className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
        
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
    </div>
  );
}