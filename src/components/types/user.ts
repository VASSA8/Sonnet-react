export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export interface AppUser {
  telegram: TelegramUser;
  nickname: string;
  birthDate: string; 
  botsCount: number;
  balance: number;
  createdAt: string;
}

export interface UserData {
  user: AppUser;
  lastLogin: string;
}