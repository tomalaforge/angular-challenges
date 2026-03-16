import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  RequestStatusState,
  setError,
  setLoading,
} from './with-request-status.feature';

export type LoaderFn<TData> = (
  search: string,
  page: number,
) => Observable<{ data: TData[]; pages: number }>;

export interface RemoteResourceState<TData> {
  data: TData;
  pages: number;
}

export function withRemoteResource<TData>({
  syncToStorage = true,
  loaderFnFactory,
}: {
  syncToStorage?: boolean;
  loaderFnFactory: () => LoaderFn<TData>;
}) {
  return signalStoreFeature(
    {
      state: type<RequestStatusState>(),
      methods: type<{ writeToStorage?: () => void }>(),
    },
    withState({
      data: [] as TData[],
      pages: 1,
    }),
    withMethods((store) => {
      const loaderFn = loaderFnFactory();

      return {
        loadResource: rxMethod<{ search: string; page: number }>(
          pipe(
            filter(({ search }) => search.length >= 3),
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => patchState(store, setLoading(true))),
            switchMap(({ search, page }) => {
              return loaderFn(search, page).pipe(
                tapResponse({
                  next({ data, pages }) {
                    patchState(
                      store,
                      {
                        data,
                        pages,
                      },
                      setLoading(false),
                    );

                    if (
                      syncToStorage &&
                      typeof store.writeToStorage === 'function'
                    ) {
                      store?.writeToStorage();
                    }
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
  );
}
