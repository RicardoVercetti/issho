// components/AppLayout.tsx
import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  username: string;
  onSignOut: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AppLayout({
  children,
  username,
  onSignOut,
  currentPage,
  onNavigate,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Issho</h2>
        <div className="mb-6">
          <p className="text-gray-600">Hello,</p>
          <p className="font-semibold">{username}</p>
        </div>
        <nav className="space-y-4">
          {['home', 'rooms', 'settings'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`block w-full text-left px-4 py-2 rounded-md ${
                currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </nav>
        <button
          onClick={onSignOut}
          className="mt-10 text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-50 transition"
        >
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}