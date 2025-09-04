// src/utils/storage.ts

import { MMKVLoader } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

export enum StorageKeys {
  USER_TOKEN = 'user_token',

}

const Storage = {
  setItem: async (key: StorageKeys, value: string): Promise<void> => {
    await MMKV.setStringAsync(key, value);
  },

getItem: async (key: StorageKeys): Promise<string | null> => {
  const value = await MMKV.getStringAsync(key);
  return value ?? null;
},

removeItem: async (key: StorageKeys): Promise<void> => {
    await MMKV.removeItem(key);
  },

  clearAll: async (): Promise<void> => {
    await MMKV.clearStore();
  },
};

export default Storage;
