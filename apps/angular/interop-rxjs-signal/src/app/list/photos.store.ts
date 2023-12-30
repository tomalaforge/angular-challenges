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
import { map, pipe, switchMap, tap } from 'rxjs';
import { FlickrAPIResponse, PhotoService } from '../photos.service';
import { APIResponse, STATE_KEYS, State } from './photos.model';

const PHOTO_STATE_KEY = 'photo_search';

export const PhotosStore = signalStore(
  withState<State>({
    photos: [],
    total: 1,
    page: 1,
    term: '',
  }),
  // api state
  signalStoreFeature(
    withState<APIResponse>({ state: 'init' }),
    withComputed(({ state }) => ({
      loading: computed(() => state() === 'loading'),
      loaded: computed(() => state() === 'loaded'),
      error: computed(() => {
        const s = state();
        return typeof s === 'object' ? s.error : null;
      }),
    })),
    withMethods(({ ...store }) => ({
      setState: (state: APIResponse) => patchState(store, state),
    })),
  ),

  withHooks({
    onInit: (store) => {
      const stateStr = localStorage.getItem(PHOTO_STATE_KEY);
      if (stateStr) {
        const state = JSON.parse(stateStr) as State;
        patchState(store, state);
      }
      effect(() => {
        const state = STATE_KEYS.reduce(
          (acc, key) => ({
            ...acc,
            [key]: store[key](),
          }),
          {},
        );
        localStorage.setItem(PHOTO_STATE_KEY, JSON.stringify(state));
      });
    },
  }),

  withComputed(({ total, page }) => ({
    isLastPage: computed(() => total() === page()),
  })),
  withMethods(({ ...store }, photoService = inject(PhotoService)) => ({
    get: rxMethod<string>(
      pipe(
        tap((term) => {
          store.setState({ state: 'loading' });
          patchState(store, { term });
        }),
        switchMap((term) => photoService.searchPublicPhotos(term, 1)),
        mapToPhotos(store),
      ),
    ),
    goToPreviousPage: rxMethod<void>(
      pipe(
        switchMap(() => photoService.searchPublicPhotos(store.term(), store.page() - 1)),
        mapToPhotos(store),
      ),
    ),
    goToNextPage: rxMethod<void>(
      pipe(
        switchMap(() => photoService.searchPublicPhotos(store.term(), store.page() + 1)),
        mapToPhotos(store),
      ),
    ),
  })),
);

const mapToPhotos = (store: any) =>
  pipe(
    map((response: FlickrAPIResponse) => response.photos),
    tap({
      next: (photos: FlickrAPIResponse['photos']) => {
        patchState(store, {
          photos: photos.photo,
          total: photos.total,
          page: photos.page,
        });
        store.setState({ state: 'loaded' });
      },
      error: () => {
        store.setState({ state: { error: 'API Error' } });
      },
    }),
  );
