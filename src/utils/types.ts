import {type AxiosError} from 'axios';

export type ValueOf<T> = T[keyof T];

export type Entries<T> = Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

export interface CustomAxiosError
  extends AxiosError<{
    code: string;
    errors: any[];
    message: string;
    status: string;
  }> {}
