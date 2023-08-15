import {QueryClient, type DefaultOptions} from '@tanstack/react-query';

const queryErrorHandler = (_error: unknown): void => {
  // error message와 함께 error page로 이동
};

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    onError: queryErrorHandler,
  },
  mutations: {
    retry: false,
    onError: queryErrorHandler,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
