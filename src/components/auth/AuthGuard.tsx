// src/components/auth/AuthGuard.tsx
import type { ReactNode } from 'react';
import { useTelegramAuth } from '../../components/hooks/useTelegramAuth';
import LoginPage from '../../pages/LoginPage';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { loading, user, isInitialized } = useTelegramAuth();

  if (loading || !isInitialized) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthGuard;