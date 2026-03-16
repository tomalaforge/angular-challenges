import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { PhotoService } from '../photos.service';
import { withRemoteResource } from '../store-feature/with-remote-resource.feature';
import { withRequestStatus } from '../store-feature/with-request-status.feature';
import { withSearchAndPaging } from '../store-feature/with-search-and-paging.feature';

export const PHOTO_STATE_KEY = 'photo_search';

export const PhotosStore = signalStore(
  withRequestStatus(),
  withSearchAndPaging(),
  withStorageSync({
    key: PHOTO_STATE_KEY,
    autoSync: false,
    select: ({ page, search }) => ({ page, search }),
  }),
  withRemoteResource({
    syncToStorage: true,
    loaderFnFactory: () => {
      const service = inject(PhotoService);
      return service.searchPublicPhotos.bind(service);
    },
  }),
  withComputed(({ page, pages }) => ({
    endOfPage: () => page() === pages(),
  })),
  withHooks((store) => {
    return {
      onInit() {
        store.readFromStorage();

        store.loadResource(() => ({
          search: store.search(),
          page: store.page(),
        }));
      },
    };
  }),
);
