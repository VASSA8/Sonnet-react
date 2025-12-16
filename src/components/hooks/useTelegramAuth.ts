// src/hooks/useTelegramAuth.ts
import { useEffect, useState, useCallback } from 'react';
import type { AppUser, TelegramUser } from '../types/user';
import { userStorage } from '../services/userStorage';

// Типы для возвращаемого значения хука
interface UseTelegramAuthReturn {
  isInitialized: boolean;
  user: AppUser | null;
  loading: boolean;
  loginWithTelegram: (tgUser: TelegramUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AppUser>) => void;
  incrementBotsCount: () => void;
  updateBalance: (amount: number) => void;
  telegramWebApp: Window['Telegram']['WebApp'] | null;
}

export const useTelegramAuth = (): UseTelegramAuthReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [telegramWebApp, setTelegramWebApp] = useState<Window['Telegram']['WebApp'] | null>(null);

  // Инициализация Telegram WebApp
  const initTelegram = useCallback((): Window['Telegram']['WebApp'] | null => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Развернуть приложение на весь экран
      tg.expand();
      
      // Отключить предупреждение о закрытии
      tg.disableClosingConfirmation();
      
      // Инициализировать основную кнопку
      tg.MainButton.setText('Продолжить');
      tg.MainButton.hide();
      
      setTelegramWebApp(tg);
      return tg;
    }
    return null;
  }, []);

  // Авторизация через Telegram
  const loginWithTelegram = useCallback((tgUser: TelegramUser): void => {
    // Создаем объект пользователя нашего приложения
    const newUser: AppUser = {
      telegram: tgUser,
      nickname: tgUser.username || tgUser.first_name,
      birthDate: '', // Пользователь заполнит позже
      botsCount: 0,
      balance: 0,
      createdAt: new Date().toISOString(),
    };
    
    // Сохраняем в локальное хранилище
    userStorage.saveUser(newUser);
    setUser(newUser);
    
    // Показываем уведомление об успешной авторизации
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.showAlert('Добро пожаловать!');
    }
  }, []);

  // Выход
  const logout = useCallback((): void => {
    userStorage.clearUser();
    setUser(null);
    
    // Перезагружаем приложение для сброса состояния
    window.location.reload();
  }, []);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      setLoading(true);
      
      // Инициализируем Telegram WebApp
      const tg = initTelegram();
      
      // Проверяем, есть ли сохраненный пользователь
      const savedUser = userStorage.getUser();
      if (savedUser) {
        setUser(savedUser.user);
      } else if (tg?.initDataUnsafe?.user) {
        // Если есть данные от Telegram, но нет сохраненных - логиним
        loginWithTelegram(tg.initDataUnsafe.user);
      }
      
      setIsInitialized(true);
      setLoading(false);
    };

    initialize();
  }, [initTelegram, loginWithTelegram]);

  return {
    isInitialized,
    user,
    loading,
    loginWithTelegram,
    logout,
    updateUser: userStorage.updateUser,
    incrementBotsCount: userStorage.incrementBotsCount,
    updateBalance: userStorage.updateBalance,
    telegramWebApp,
  };
};