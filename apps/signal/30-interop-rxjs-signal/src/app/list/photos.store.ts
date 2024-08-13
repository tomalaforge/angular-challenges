import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

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

export const PhotoStore = signalStore(
  withState(initialState),
  withMethods((store, photoService = inject(PhotoService)) => ({
    updateSearch: (value: string) => {
      patchState(store, { search: value });
    },
    nextPage: () => {
      patchState(store, {
        page: store.page() >= store.pages() ? store.pages() : store.page() + 1,
      });
    },
    previousPage: () => {
      let page = store.page() - 1;
      if (store.page() <= 1) {
        page = 1;
      } else if (store.page() > store.pages()) {
        page = store.pages();
      }

      patchState(store, { page });
    },
    getPhotos: rxMethod<{ search: string; page: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: '' })),
        switchMap(({ search, page }) =>
          photoService.searchPublicPhotos(search, page).pipe(
            tapResponse(
              ({ photos: { photo, pages } }) => {
                patchState(store, {
                  loading: false,
                  photos: photo,
                  pages,
                });
                localStorage.setItem(
                  PHOTO_STATE_KEY,
                  JSON.stringify({ search, page }),
                );
              },
              (error: unknown) => patchState(store, { error, loading: false }),
            ),
          ),
        ),
      ),
    ),
  })),
  withComputed((store) => ({
    lastPage: computed(() => store.page() >= store.pages()),
    filter: computed(() => ({ search: store.search(), page: store.page() })),
  })),
  withHooks({
    onInit(store) {
      console.log('onInit Hook');

      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState !== null) {
        const savedState = JSON.parse(savedJSONState);
        patchState(store, { search: savedState.search, page: savedState.page });
      }
    },
  }),
);
