import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const KEY = 'auth-jwt-token';

// example code
export function useAuthStorageData() {
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
