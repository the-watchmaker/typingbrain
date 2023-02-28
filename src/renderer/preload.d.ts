import { ApiHandler } from 'main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    api: ApiHandler;
  }
}

export {};
