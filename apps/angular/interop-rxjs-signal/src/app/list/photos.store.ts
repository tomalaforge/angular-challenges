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
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, filter, mergeMap, pipe, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';
import {
  setError,
  setLoaded,
  setLoading,
  withLoadingState,
} from '../shared/state/loading.feature';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  photos: Photo[];
  filter: FilterState;
  pages: number;
}

export interface FilterState {
  search: string;
  page: number;
}

const initialState: PhotoState = {
  photos: [],
  filter: {
    search: '',
    page: 1,
  },
  pages: 1,
};

export const PhotosStore = signalStore(
  { providedIn: 'root' },
  withState(getInitialState()),
  withLoadingState(),
  withComputed(({ filter, pages }) => ({
    endOfPage: computed(() => filter.page() === pages()),
  })),
  withMethods((store, photoService = inject(PhotoService)) => ({
    updateSearch(search: string) {
      store.endOfPage;
      patchState(store, { filter: { page: 1, search } });
    },
    nextPage() {
      patchState(store, {
        filter: {
          ...store.filter(),
          page: store.filter.page() + 1,
        },
      });
    },
    previousPage() {
      patchState(store, {
        filter: {
          ...store.filter(),
          page: store.filter.page() - 1,
        },
      });
    },
    searchPhotos: rxMethod<FilterState>(
      pipe(
        filter(({ search }) => search.length >= 3),
        mergeMap(({ search, page }) =>
          photoService.searchPublicPhotos(search, page).pipe(
            tap(() => {
              console.log(search);
              patchState(store, setLoading());
            }),
            delay(200),
            tapResponse({
              next: ({ photos: { photo, pages } }) => {
                patchState(store, { photos: photo, pages }, setLoaded());

                localStorage.setItem(
                  PHOTO_STATE_KEY,
                  JSON.stringify({ search, page }),
                );
              },
              error: (error: Error) => {
                patchState(store, setError(error));
              },
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit({ searchPhotos, filter }) {
      //rxMethod returns a function so we need to call it
      //every time search signal is updated; and that is why
      //we pass search ref as input to searchPhotos function
      //if we pass search() the function will be executed only once
      searchPhotos(filter);
    },
  }),
);

function getInitialState(): PhotoState {
  const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
  if (savedJSONState === null) {
    return initialState;
  }

  const savedState = JSON.parse(savedJSONState);
  return {
    ...initialState,
    filter: {
      search: savedState.search,
      page: savedState.page,
    },
  };
}
