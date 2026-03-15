import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface SearchAndPagingState {
  search: string;
  page: number;
}

export function withSearchAndPaging() {
  return signalStoreFeature(
    withState<SearchAndPagingState>({
      search: '',
      page: 1,
    }),
    withMethods((store) => {
      return {
        setSearch: (search: string) => {
          patchState(store, { search, page: 1 });
        },
        nextPage: () => {
          patchState(store, ({ page }) => ({ page: page + 1 }));
        },
        previousPage: () => {
          patchState(store, ({ page }) => ({ page: page - 1 }));
        },
      };
    }),
  );
}
