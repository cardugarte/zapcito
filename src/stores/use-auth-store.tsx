import { create } from 'zustand';

import { Auth, database } from '@/lib/indexeddb';

// Define store interfaces
interface AuthProps {
  auth: Auth | null;
  handleAdd: (auth: Auth) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleGet: () => Promise<Auth | null>;
}

// Create the Zustand stores
export const useAuthStore = create<AuthProps>((set) => ({
  auth: null,

  handleAdd: async (user: Auth) => {
    await database.auth.put(user);
    set({ auth: user });
  },

  handleDelete: async () => {
    await database.auth.clear();
    set({ auth: null });
  },

  handleGet: async () => {
    const auth = await database.auth.toArray();
    if (auth.length > 0) {
      set({ auth: auth[0] });
      return auth[0];
    }
    return null;
  },
}));