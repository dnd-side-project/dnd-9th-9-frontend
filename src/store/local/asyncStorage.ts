import AsyncStorage, {
  useAsyncStorage as _useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {ValueOf} from '../../utils/types';

const PREFIX = 'matchup' as const;

export const ASYNC_STORAGE_KEYS = {
  AUTH_JWT: `${PREFIX}-auth-jwt-token`,
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
      const data = await AsyncStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
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
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
      }
    }
  },

  remove: async (
    key: TAsyncStorageKey,
    errorHandler: TErrorHandlingFunction = defaultErrorHandler,
  ): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, key);
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
      }
    }
  },
};

export const useAsyncStorage = (key: TAsyncStorageKey) => {
  return _useAsyncStorage(key);
};
