// screens/HomeScreen.tsx
import { AppLayout } from '../components/AppLayout';

interface HomePageProps {
  username: string;
  onSignOut: () => void;
}

export function HomePage({ username, onSignOut }: HomePageProps) {
  return <AppLayout username={username} onSignOut={onSignOut} />;
}
