import {MATCH_UP_API_URL} from '@env';
import Axios, {type AxiosResponse} from 'axios';

import {asyncStorage, ASYNC_STORAGE_KEYS} from './asyncStorage';
import {requestPostAuthRefresh} from '../features/auth/hooks/auth';
import {appNavigationRef} from '../navigators';
import {type CustomAxiosError} from '../utils/types';

export const axios = Axios.create({
  baseURL: MATCH_UP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();

  for (const key in paramObj) {
    const value = paramObj[key];

    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        if (item !== null && item !== undefined) {
          params.append(key, item);
        }
      });
    } else if (value !== null && value !== undefined) {
      params.append(key, value);
    }
  }

  return params.toString();
};

axios.interceptors.request.use(async config => {
  const token = await asyncStorage.get<string>(
    ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN,
  );
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(undefined, async error => {
  if (Axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      void handle401Error(error);
    }
  }
  return await Promise.reject(error);
});

const handle401Error = async (
  error: CustomAxiosError,
): Promise<AxiosResponse<any, any> | undefined> => {
  switch (error.response?.data.code) {
    case 'J-001':
    case 'J-003': {
      // 유효하지 않은 (잘못된) JWT 토큰 (J-001)
      // 지원하지 않는 JWT 토큰 (J-003)
      // - 재로그인
      if (appNavigationRef.isReady()) {
        appNavigationRef.navigate('Login');
      }
      break;
    }
    case 'J-002': {
      // 만료된 토큰(J-002)
      // - 토큰 재발급
      const refreshToken = await asyncStorage.get<string>(
        ASYNC_STORAGE_KEYS.AUTH_JWT_REFRESH_TOKEN,
      );

      if (refreshToken != null) {
        const {accessToken} = await requestPostAuthRefresh({
          body: {
            refreshToken,
          },
        });

        await asyncStorage.set<string>(
          ASYNC_STORAGE_KEYS.AUTH_JWT_ACCESS_TOKEN,
          accessToken,
        );

        if (error.config != null) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return await axios(error.config);
        }
      }
      break;
    }
  }
};
