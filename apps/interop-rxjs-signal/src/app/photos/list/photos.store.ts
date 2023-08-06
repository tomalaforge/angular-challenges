import { inject } from '@angular/core';
import { filter, pipe, switchMap, tap } from 'rxjs';
import {
  selectSignal,
  signalStore,
  withHooks,
  withMethods,
  withSignals,
  withState,
} from '@ngrx/signals';
import { withStorageSync } from '@ngrx/signals/storage';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Photo } from '../photo.model';
import { PhotosService } from '../photos.service';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from '../../shared/state/call-state.feature';
import { Filter, withFilter } from '../../shared/state/filter.feature';

type State = { photos: Photo[]; totalPages: number };

export const PhotosStore = signalStore(
  withState<State>({ photos: [], totalPages: 1 }),
  withCallState(),
  withFilter(),
  withSignals(({ filter, totalPages }) => ({
    isLastPage: selectSignal(() => filter.page() === totalPages()),
  })),
  withMethods((store, photoService = inject(PhotosService)) => ({
    loadByFilter: rxMethod<Filter>(
      pipe(
        filter(({ query }) => query.length >= 3),
        tap(() => store.$update(setLoading())),
        switchMap((filter) => photoService.getByFilter(filter)),
        tap({
          next: (result) => store.$update(result, setLoaded()),
          error: (error) => store.$update(setError(error.message)),
        })
      )
    ),
  })),
  withStorageSync({ key: 'photos_filter', syncSlices: ['filter'] }),
  withHooks({
    onInit: ({ filter, loadByFilter }) => loadByFilter(filter),
  })
);
