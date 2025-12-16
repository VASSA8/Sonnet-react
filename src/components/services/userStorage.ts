// src/services/userStorage.ts
import type { AppUser, UserData } from '../types/user';

const STORAGE_KEY = 'sonnet_user_data';

export const userStorage = {
  // Сохранить данные пользователя
  saveUser(user: AppUser): void {
    const userData: UserData = {
      user,
      lastLogin: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  },

  // Получить данные пользователя
  getUser(): UserData | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    try {
      return JSON.parse(data) as UserData;
    } catch {
      return null;
    }
  },

  // Обновить данные пользователя
  updateUser(updates: Partial<AppUser>): void {
    const existing = this.getUser();
    if (!existing) return;
    
    const updatedUser: AppUser = {
      ...existing.user,
      ...updates,
    };
    
    this.saveUser(updatedUser);
  },

  // Увеличить количество ботов
  incrementBotsCount(): void {
    const existing = this.getUser();
    if (!existing) return;
    
    this.updateUser({
      botsCount: existing.user.botsCount + 1,
    });
  },

  // Обновить баланс
  updateBalance(amount: number): void {
    const existing = this.getUser();
    if (!existing) return;
    
    this.updateUser({
      balance: existing.user.balance + amount,
    });
  },

  // Удалить данные пользователя (выход)
  clearUser(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Проверить, авторизован ли пользователь
  isAuthenticated(): boolean {
    return this.getUser() !== null;
  },
};