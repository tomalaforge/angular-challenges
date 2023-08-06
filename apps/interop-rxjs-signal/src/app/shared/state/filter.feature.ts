import {
  SignalStateUpdater,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export type Filter = { query: string; page: number };

const initialFilter: Filter = { query: '', page: 1 };

export function withFilter() {
  return signalStoreFeature(
    withState({ filter: initialFilter }),
    withMethods(({ $update, filter }) => ({
      updateQuery(query: string): void {
        $update(patchFilter({ query, page: 1 }));
      },
      goToNextPage(): void {
        $update(patchFilter({ page: filter().page + 1 }));
      },
      goToPreviousPage(): void {
        $update(patchFilter({ page: filter().page - 1 }));
      },
    }))
  );
}

function patchFilter(partialFilter: Partial<Filter>): SignalStateUpdater<{
  filter: Filter;
}> {
  return (state) => ({ filter: { ...state.filter, ...partialFilter } });
}
