import {useEffect, useState} from 'react';
import {
  ASYNC_STORAGE_KEYS,
  useAsyncStorage,
} from '../../../store/local/asyncStorage';

// example code
export function useAuthStorage() {
  const [token, setToken] = useState<string | null>();
  const {getItem, setItem} = useAsyncStorage(ASYNC_STORAGE_KEYS.AUTH_JWT);

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
