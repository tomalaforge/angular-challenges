export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  status: string;
}
export interface ResponseError {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: string;
  headers: Headers2;
}

export interface NormalizedNames {}

export interface Headers2 {}

export interface Error {
  isTrusted: boolean;
}
