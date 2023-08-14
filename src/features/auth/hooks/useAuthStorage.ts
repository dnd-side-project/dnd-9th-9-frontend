import {useEffect, useState} from 'react';

import {ASYNC_STORAGE_KEYS, useAsyncStorage} from '../../../lib/asyncStorage';

interface IUseAuthStorageReturn {
  token: string | null | undefined;
  setToken: (newToken: string) => Promise<void>;
}

// example code
export function useAuthStorage(): IUseAuthStorageReturn {
  const [token, setToken] = useState<string | null>();
  const {getItem, setItem} = useAsyncStorage(ASYNC_STORAGE_KEYS.AUTH_JWT);

  const getTokenFromStorage = async (): Promise<void> => {
    const token = await getItem();
    setToken(token);
  };

  const setTokenFromStorage = async (newToken: string): Promise<void> => {
    await setItem(newToken);
    setToken(newToken);
  };

  useEffect(() => {
    void getTokenFromStorage();
  }, []);

  return {
    token,
    setToken: setTokenFromStorage,
  };
}
