import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  avatar: string;
  level: string;
  streak: number;
  xp: number;
  learningLanguage: string;
}

interface StoreState {
  user: User;
  setUser: (user: Partial<User>) => void;
  addXp: (amount: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: {
    id: '1',
    name: 'PolyglotExplorer',
    avatar: '🦊',
    level: 'A2',
    streak: 12,
    xp: 2450,
    learningLanguage: 'Spanish',
  },
  setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
  addXp: (amount) => set((state) => ({ user: { ...state.user, xp: state.user.xp + amount } })),
}));