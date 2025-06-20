import { WritableSignal } from '@angular/core';

export type Store<T, K extends string> = {
  [key in K]: WritableSignal<T[]>;
};
