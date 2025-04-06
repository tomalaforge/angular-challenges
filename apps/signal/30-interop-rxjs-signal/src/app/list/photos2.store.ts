import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  readonly photos: Photo[];
  readonly search: string;
  readonly page: number;
  readonly pages: number;
  readonly loading: boolean;
  readonly error: unknown;
}

const initialState: PhotoState = {
  photos: [],
  search: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotoStore2 = signalStore(
  {
    providedIn: 'root',
  },
  withState<PhotoState>(initialState),
  withLocalStorage(PHOTO_STATE_KEY),
  withComputed((state) => ({
    endOfPage: computed(() => state.page() === state.pages()),
  })),
  withMethods((state, photoService = inject(PhotoService)) => ({
    setPageRelative(offset: number) {
      const newPage = state.page() + offset;
      if (newPage > 0 && newPage <= state.pages()) {
        patchState(state, { page: newPage });
      }
    },
    setPage(page: number) {
      patchState(state, {
        page,
      });
    },
    setSearch(search: string) {
      patchState(state, {
        search,
        page: 1,
      });
    },
    loadByFilter: rxMethod<{ query: string; page?: number }>(
      pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap(({ query, page }) =>
          photoService.searchPublicPhotos(query, page ?? state.page()),
        ),
        tap({
          next: (response) => {
            patchState(state, {
              photos: response.photos.photo,
              pages: response.photos.pages,
              loading: false,
            });
          },
          error: (error: unknown) => {
            patchState(state, {
              error,
              loading: false,
            });
          },
        }),
      ),
    ),
  })),
  withHooks((store) => ({
    onInit() {
      store.loadByFilter({ query: store.search(), page: store.page() });

      effect(() => {
        const search = store.search();
        const page = store.page();
        store.loadByFilter({ query: search, page });
      });
    },
  })),
);

export function withLocalStorage(key: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store: any) {
        const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);

        if (savedJSONState) {
          const savedState = JSON.parse(savedJSONState);
          patchState(store, {
            ...initialState,
            search: savedState.search,
            page: savedState.page,
          });
        }

        effect(() => {
          const toSave = {
            search: store.search(),
            page: store.page(),
          };

          localStorage.setItem(key, JSON.stringify(toSave));
        });
      },
    }),
  );
}
