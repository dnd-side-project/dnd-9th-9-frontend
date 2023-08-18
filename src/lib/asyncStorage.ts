import AsyncStorage, {
  useAsyncStorage as _useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {type AsyncStorageHook} from '@react-native-async-storage/async-storage/lib/typescript/types';

import {type ValueOf} from '../utils/types';

const PREFIX = 'matchup' as const;

export const ASYNC_STORAGE_KEYS = {
  AUTH_JWT: 'auth-jwt-token',
} as const;

type TAsyncStorageKey = ValueOf<typeof ASYNC_STORAGE_KEYS>;
type TErrorHandlingFunction = (error: Error, key?: TAsyncStorageKey) => void;

const defaultErrorHandler: TErrorHandlingFunction = error => {
  console.error(error.message);
};

export const asyncStorage = {
  get: async <T>(
    key: TAsyncStorageKey,
    errorHandler: TErrorHandlingFunction = defaultErrorHandler,
  ): Promise<T | null> => {
    try {
      const data = await AsyncStorage.getItem(`${PREFIX}-${key}`);
      return data != null ? (JSON.parse(data) as T) : null;
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
      } else {
        console.error(`AsyncStorage Error: get ${key}`);
      }
      return null;
    }
  },

  set: async <T>(
    key: TAsyncStorageKey,
    value: T,
    errorHandler: TErrorHandlingFunction = defaultErrorHandler,
  ): Promise<void> => {
    try {
      const data = JSON.stringify(value);
      await AsyncStorage.setItem(`${PREFIX}-${key}`, data);
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
      } else {
        console.error(`AsyncStorage Error: set ${key}`);
      }
    }
  },

  remove: async (
    key: TAsyncStorageKey,
    errorHandler: TErrorHandlingFunction = defaultErrorHandler,
  ): Promise<void> => {
    try {
      await AsyncStorage.removeItem(`${PREFIX}-${key}`);
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
      } else {
        console.error(`AsyncStorage Error: remove ${key}`);
      }
    }
  },

  clear: async (
    errorHandler: TErrorHandlingFunction = defaultErrorHandler,
  ): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error);
      } else {
        console.error(`AsyncStorage Error: clear `);
      }
    }
  },
};

export const useAsyncStorage = (key: TAsyncStorageKey): AsyncStorageHook => {
  return _useAsyncStorage(`${PREFIX}-${key}`);
};
