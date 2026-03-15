import { inject } from '@angular/core';
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
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';
import {
  setError,
  setLoading,
  withRequestStatus,
} from '../store-feature/with-request-status.feature';
import { withSearchAndPaging } from '../store-feature/with-search-and-paging.feature';

export const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoStoreState {
  photos: Photo[];
  pages: number;
}

const initialState: PhotoStoreState = {
  photos: [],
  pages: 1,
};

export const PhotosStore = signalStore(
  withState(initialState),
  withRequestStatus(),
  withSearchAndPaging(),
  withComputed(({ page, pages }) => ({
    endOfPage: () => page() === pages(),
  })),
  withMethods((store) => {
    const photoService = inject(PhotoService);

    return {
      loadPhoto: rxMethod<{ search: string; page: number }>(
        pipe(
          filter(({ search }) => search.length >= 3),
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, setLoading(true))),
          switchMap(({ search, page }) => {
            return photoService.searchPublicPhotos(search, page).pipe(
              tapResponse({
                next({ photos: { photo, pages } }) {
                  patchState(
                    store,
                    {
                      photos: photo,
                      pages,
                    },
                    setLoading(false),
                  );

                  localStorage.setItem(
                    PHOTO_STATE_KEY,
                    JSON.stringify({ search, page }),
                  );
                },
                error(error) {
                  patchState(store, setError(error));
                },
              }),
            );
          }),
        ),
      ),
    };
  }),
  withHooks((store) => {
    return {
      onInit() {
        const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);

        if (savedJSONState !== null) {
          const { search, page }: { search: string; page: number } =
            JSON.parse(savedJSONState);
          patchState(store, {
            search,
            page,
          });
        }

        store.loadPhoto(() => ({
          search: store.search(),
          page: store.page(),
        }));
      },
    };
  }),
);
