import { computed, inject, InjectionToken } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { of } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
}

const initialState: PhotoState = {
  photos: [],
  search: '',
  page: 1,
  pages: 1,
};

const PHOTO_STATE = new InjectionToken<PhotoState>('PhotoState', {
  factory: () => initialState,
});

export const PhotoStore = signalStore(
  withState(() => inject(PHOTO_STATE)),
  withProps((store, photoService = inject(PhotoService)) => ({
    photosResource: rxResource({
      params: () => ({
        search: store.search(),
        page: store.page(),
      }),
      stream: ({ params: { search, page } }) => {
        console.log('Searching for:', search, 'Page:', page);
        if (search !== '' && (search == undefined || search.length < 3)) {
          return of(undefined);
        }

        return photoService.searchPublicPhotos(search, page).pipe(
          tapResponse({
            next: ({ photos: { photo, pages } }) => {
              patchState(store, {
                photos: photo,
                pages,
              });
              localStorage.setItem(
                PHOTO_STATE_KEY,
                JSON.stringify({ search, page }),
              );
            },
            error: (error: unknown) => {
              console.error('Photo search error:', error);
            },
          }),
        );
      },
    }),
  })),
  withComputed(({ photosResource, page, pages }) => ({
    loading: computed(() => photosResource.isLoading()),
    error: computed(() => photosResource.error()),
    endOfPage: computed(() => page() === pages()),
  })),
  withMethods((store) => ({
    setSearch(search: string) {
      patchState(store, { search, page: 1 });
    },
    nextPage(): void {
      patchState(store, (state) => ({
        ...state,
        page: state.page + 1,
      }));
    },
    previousPage(): void {
      patchState(store, (state) => ({
        ...state,
        page: state.page - 1,
      }));
    },
  })),
  withHooks((store) => ({
    onInit() {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState !== null) {
        const savedState = JSON.parse(savedJSONState);
        patchState(store, {
          search: savedState.search,
          page: savedState.page,
        });
      }
    },
  })),
);
