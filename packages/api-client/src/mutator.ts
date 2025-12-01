import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Базовый URL API (можно переопределить через env)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Создаем кастомный axios instance с настройками
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = Axios({
    ...config,
    ...options,
    baseURL: API_BASE_URL,
    cancelToken: source.token,
    withCredentials: true, // Для поддержки cookies/sessions
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
      ...options?.headers,
    },
  }).then(({ data }: AxiosResponse<T>) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export default customInstance;

// Тип для ошибок API
export type ErrorType<Error> = AxiosError<Error>;

