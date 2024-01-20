import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

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

@Injectable()
export class PhotoStore
  extends ComponentStore<PhotoState>
  implements OnStoreInit, OnStateInit
{
  private photoService = inject(PhotoService);

  private readonly photos$ = this.select((s) => s.photos);
  private readonly search$ = this.select((s) => s.search);
  private readonly page$ = this.select((s) => s.page);
  private readonly pages$ = this.select((s) => s.pages);
  private readonly error$ = this.select((s) => s.error);
  private readonly loading$ = this.select((s) => s.loading);

  private readonly endOfPage$ = this.select(
    this.page$,
    this.pages$,
    (page, pages) => page === pages,
  );

  readonly vm$ = this.select(
    {
      photos: this.photos$,
      search: this.search$,
      page: this.page$,
      pages: this.pages$,
      endOfPage: this.endOfPage$,
      loading: this.loading$,
      error: this.error$,
    },
    { debounce: true },
  );

  ngrxOnStoreInit() {
    const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
    if (savedJSONState === null) {
      this.setState(initialState);
    } else {
      const savedState = JSON.parse(savedJSONState);
      this.setState({
        ...initialState,
        search: savedState.search,
        page: savedState.page,
      });
    }
  }

  ngrxOnStateInit() {
    this.searchPhotos(
      this.select({
        search: this.search$,
        page: this.page$,
      }),
    );
  }

  readonly search = this.updater(
    (state, search: string): PhotoState => ({
      ...state,
      search,
      page: 1,
    }),
  );

  readonly nextPage = this.updater(
    (state): PhotoState => ({
      ...state,
      page: state.page + 1,
    }),
  );

  readonly previousPage = this.updater(
    (state): PhotoState => ({
      ...state,
      page: state.page - 1,
    }),
  );

  readonly searchPhotos = this.effect<{ search: string; page: number }>(
    pipe(
      filter(({ search }) => search.length >= 3),
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap(({ search, page }) =>
        this.photoService.searchPublicPhotos(search, page).pipe(
          tapResponse(
            ({ photos: { photo, pages } }) => {
              this.patchState({
                loading: false,
                photos: photo,
                pages,
              });
              localStorage.setItem(
                PHOTO_STATE_KEY,
                JSON.stringify({ search, page }),
              );
            },
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );
}
