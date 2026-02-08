import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EMPTY, Subject, catchError, mergeMap, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

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
      const photoService = inject(PhotoService);
      const querySearch = computed<{ search: string; page: number }>(() => ({
        search: store.search(),
        page: store.page(),
      }));
      const querySearchSubject$ = new Subject<{
        search: string;
        page: number;
      }>();

      const sub = querySearchSubject$
        .pipe(
          tap(() => patchState(store, { loading: true, error: '' })),
          mergeMap(({ search, page }) => {
            if (!search) {
              patchState(store, {
                photos: [],
                pages: 1,
                loading: false,
              });
              return EMPTY;
            }
            return photoService.searchPublicPhotos(search, page).pipe(
              catchError((error) => {
                patchState(store, { loading: false, error: 'error' });
                return EMPTY;
              }),
            );
          }),
        )
        .subscribe(({ photos }) => {
          patchState(store, {
            pages: photos.pages,
            photos: photos.photo,
            loading: false,
          });
          localStorage.setItem(
            PHOTO_STATE_KEY,
            JSON.stringify({ search: store.search(), page: store.page() }),
          );
        });

      const ref = effect(() => querySearchSubject$.next(querySearch()), {
        allowSignalWrites: true,
      });
      return () => {
        ref.destroy();
        sub.unsubscribe();
      };
    },
  }),
);
