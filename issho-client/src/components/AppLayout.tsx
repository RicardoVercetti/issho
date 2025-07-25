// components/AppLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "/chat.png";

interface AppLayoutProps {
  username: string;
  onSignOut: () => void;
}

export function AppLayout({ username, onSignOut }: AppLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <img src={Logo} alt="App Logo" className="h-10 w-10" />
          <h2 className="text-2xl font-bold text-blue-600">Issho</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">Hello,</p>
          <p className="font-semibold">{username}</p>
        </div>
        <nav className="space-y-4">
          <Link
            to="/"
            className={`block w-full text-left px-4 py-2 rounded-md ${
              isActive("/") ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/rooms"
            className={`block w-full text-left px-4 py-2 rounded-md ${
              isActive("/rooms")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
          >
            Rooms
          </Link>
          <Link
            to="/settings"
            className={`block w-full text-left px-4 py-2 rounded-md ${
              isActive("/settings")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
          >
            Settings
          </Link>
        </nav>
        <button
          onClick={onSignOut}
          className="mt-10 text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-50 transition"
        >
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
