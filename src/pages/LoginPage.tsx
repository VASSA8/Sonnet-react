// src/pages/LoginPage.tsx
import { useEffect } from 'react';
import { useTelegramAuth } from '../components/hooks/useTelegramAuth';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loginWithTelegram } = useTelegramAuth();

  useEffect(() => {
    // Проверяем данные Telegram при загрузке
    const checkTelegramData = () => {
      if (window.Telegram?.WebApp?.initDataUnsafe?.user && !user) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        loginWithTelegram(tgUser);
      }
    };

    checkTelegramData();
  }, [user, loginWithTelegram]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">SONNETDEV</h1>
        <p className="login-subtitle">
          Для использования приложения требуется авторизация через Telegram
        </p>
        
        {!user && (
          <>
            
            <div className="login-instruction">
              <p>Для входа просто откройте это приложение через Telegram</p>
              <p className="instruction-small">
                Если вы видите это сообщение, откройте приложение через бота в Telegram
              </p>
            </div>
          </>
        )}
        
        {user && (
          <div className="login-success">
            <h2>✅ Вы авторизованы!</h2>
            <p>Перенаправляем в приложение...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;