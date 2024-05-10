import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  searchTerm: string; // change the name to remove confusion with search method
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const initialState: PhotoState = {
  searchTerm: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotosStore = signalStore(
  withState(initialState),
  withEntities<Photo>(),
  withComputed(({ page, pages }) => ({
    endOfPage: computed(() => page() === pages()),
  })),
  withComputed(
    ({ endOfPage, entities, error, loading, page, pages, searchTerm }) => ({
      vm: computed(() => ({
        searchTerm: searchTerm(),
        page: page(),
        pages: pages(),
        loading: loading(),
        error: error(),
        endOfPage: endOfPage(),
        photos: entities(),
      })),
    }),
  ),
  withMethods((state, photoService = inject(PhotoService)) => ({
    load() {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState) {
        const savedState = JSON.parse(savedJSONState);
        patchState(state, {
          searchTerm: savedState.searchTerm,
          page: savedState.page,
        });
      }
    },
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
                patchState(
                  state,
                  {
                    loading: false,
                    pages,
                  },
                  setAllEntities(photo),
                );
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
    search(searchTerm: string) {
      patchState(state, { searchTerm, page: 1 });
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
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
