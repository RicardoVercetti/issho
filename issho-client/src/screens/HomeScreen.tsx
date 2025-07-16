// screens/HomeScreen.tsx
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { ChatPage } from './ChatPage';
import { SettingsPage } from './Settings';
import { RoomsPage } from './Rooms';

interface HomePageProps {
  username: string;
  onSignOut: () => void;
}

export function HomePage({ username, onSignOut }: HomePageProps) {
  const [currentPage, setCurrentPage] = useState('home');

  let PageComponent;
  switch (currentPage) {
    case 'settings':
      PageComponent = <SettingsPage />;
      break;
    case 'rooms':
      PageComponent = <RoomsPage />;
      break;
    case 'home':
    default:
      PageComponent = <ChatPage />;
  }

  return (
    <AppLayout
      username={username}
      onSignOut={onSignOut}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {PageComponent}
    </AppLayout>
  );
}