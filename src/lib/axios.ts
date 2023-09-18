import Axios from 'axios';

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
    if (paramObj[key] !== null && paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }

  return params.toString();
};

axios.interceptors.request.use(async config => {
  // TODO: jwt 관련 설정 추가
  // const token = await asyncStorage.get<string>(ASYNC_STORAGE_KEYS.AUTH_JWT);
  // if (token != null) {
  //   config.headers.setAuthorization(token);
  // }
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
