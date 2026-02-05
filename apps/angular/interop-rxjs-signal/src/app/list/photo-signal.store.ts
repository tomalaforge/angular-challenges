import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Photo } from '../photo.model';

export interface PhotoState {
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const initialState: PhotoState = {
  photos: [],
  search: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

const PHOTO_STATE_KEY = 'photo_search';

export const PhotoSignalStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    endOfPage: computed(() => store.page() === store.pages()),
  })),
  withMethods((store) => {
    return {
      nextPage() {
        patchState(store, {
          page: store.page() + 1,
        });
      },
      previousPage() {
        patchState(store, {
          page: store.page() - 1,
        });
      },
      setSearch(search: string) {
        patchState(store, { search, page: 1 });
      },
    };
  }),
  withHooks({
    onInit(store) {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      savedJSONState === null
        ? patchState(store)
        : patchState(store, {
            search: JSON.parse(savedJSONState).search,
            page: JSON.parse(savedJSONState).page,
          });
      effect(() => {
        console.log('search/page', store.search(), store.page());
      });
    },
  }),
);
