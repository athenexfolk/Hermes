export interface Response<T>{
  data?: T;
  msg?: string;
  error?: Record<string, string>;
}
