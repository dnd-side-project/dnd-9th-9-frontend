import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const KEY = 'auth-jwt-token';

// example code
// 1. hook
export function useAuthStorage() {
  const [token, setToken] = useState<string | null>();
  const {getItem, setItem} = useAsyncStorage(KEY);

  const getTokenFromStorage = async () => {
    const token = await getItem();
    setToken(token);
  };

  const setTokenFromStorage = async (newToken: string) => {
    await setItem(newToken);
    setToken(newToken);
  };

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  return {
    token,
    setToken: setTokenFromStorage,
  };
}

// 2. obj
export const authStorage = {
  async get() {
    try {
      const jsonToken = await AsyncStorage.getItem(KEY);
      return jsonToken ? JSON.parse(jsonToken) : null;
    } catch (e) {
      throw new Error('Failed to load token');
    }
  },
  async set(data: string) {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save token');
    }
  },
};
