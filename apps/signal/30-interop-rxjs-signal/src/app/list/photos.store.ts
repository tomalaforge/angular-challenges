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
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  photos: Photo[];
  searchTerm: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const initialState: PhotoState = {
  photos: [],
  searchTerm: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotoStore = signalStore(
  withState(initialState),
  withComputed(({ page, pages }) => ({
    endOfPage: computed(() => page() === pages()),
  })),
  withHooks({
    onInit(store) {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState) {
        const savedState = JSON.parse(savedJSONState);
        patchState(store, () => {
          return {
            searchTerm: savedState.searchTerm,
            page: savedState.page,
          };
        });
      }
    },
    onDestroy() {
      console.log('destroying store');
    },
  }),
  withMethods((state, photoService = inject(PhotoService)) => ({
    searchPhotos: rxMethod<void>(
      pipe(
        filter(() => state.searchTerm().length >= 3),
        tap(() => patchState(state, { loading: true, error: '' })),
        mergeMap(() => {
          const searchTerm = state.searchTerm();
          const page = state.page();
          return photoService.searchPublicPhotos(searchTerm, page).pipe(
            tapResponse({
              next: ({ photos: { photo, pages } }) => {
                patchState(state, {
                  loading: false,
                  pages,
                  photos: photo,
                });
                localStorage.setItem(
                  PHOTO_STATE_KEY,
                  JSON.stringify({ searchTerm, page }),
                );
              },
              error: (error: unknown) =>
                patchState(state, { error, loading: false }),
            }),
          );
        }),
      ),
    ),
  })),
  withMethods((state) => ({
    search(search: string) {
      patchState(state, { searchTerm: search, page: 1 });
      state.searchPhotos();
    },
    nextPage() {
      patchState(state, { page: state.page() + 1 });
      state.searchPhotos();
    },
    previousPage() {
      patchState(state, { page: state.page() - 1 });
      state.searchPhotos();
    },
  })),
);
