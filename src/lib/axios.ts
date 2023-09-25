import Axios from 'axios';

import {asyncStorage, ASYNC_STORAGE_KEYS} from './asyncStorage';

// TODO: env 관련 설정 추가
export const API_URL = '/api';

export const axios = Axios.create({
  baseURL: API_URL,
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
    if (statusCode === 401 || statusCode === 403) {
      // TODO: 재로그인
    }
  }
  return await Promise.reject(error);
});
