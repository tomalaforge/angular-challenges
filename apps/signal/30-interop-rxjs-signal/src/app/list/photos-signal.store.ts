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
import { debounceTime, pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  photos: Photo[];
  searchToken: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const initialState: PhotoState = {
  photos: [],
  searchToken: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotosSignalStore = signalStore(
  withState(initialState),
  withHooks({
    onInit(store) {
      const storageState = JSON.parse(
        localStorage.getItem(PHOTO_STATE_KEY) || '{}',
      );
      if (storageState) {
        patchState(store, { ...storageState });
      }
    },
  }),
  withComputed(({ page, pages }) => ({
    isLastPage: computed(() => {
      return page === pages;
    }),
  })),
  withMethods((store, photoService = inject(PhotoService)) => ({
    nextPage() {
      patchState(store, (state) => ({ page: state.page + 1 }));
    },
    previousPage() {
      patchState(store, (state) => ({ page: state.page - 1 }));
    },
    setSearchToken(search: string) {
      patchState(store, () => ({ searchToken: search, page: 1 }));
    },
    searchPhotos: rxMethod<{ search: string; page: number }>(
      pipe(
        debounceTime(300),
        filter(({ search }) => search.length >= 3),
        tap(() => patchState(store, { loading: true, error: '' })),
        mergeMap(({ search, page }) =>
          photoService.searchPublicPhotos(search, page).pipe(
            tapResponse({
              next: ({ photos: { photo, pages } }) => {
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
              error: (err) => patchState(store, { error: err, loading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
