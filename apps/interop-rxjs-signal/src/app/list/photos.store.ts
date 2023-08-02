import { Injectable, computed, inject, signal } from '@angular/core';
import { Subject, defer, merge, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Photo } from '../photo.model';
import { FlickrAPIResponse, PhotoService } from '../photos.service';
import { FormControl } from '@angular/forms';
import { connectSource } from '../connect-source';

const PHOTO_STATE_KEY = 'photo_search';

export interface PhotoState {
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const defaultState: PhotoState = {
  photos: [],
  search: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

const getSavedState = (): PhotoState => {
  const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
  const parsedState = savedJSONState && JSON.parse(savedJSONState);
  return parsedState
    ? { ...defaultState, search: parsedState.search, page: parsedState.page }
    : defaultState;
};

@Injectable({ providedIn: 'root' })
export class PhotoStore {
  private readonly photoService = inject(PhotoService);

  // Signals
  readonly state = signal(getSavedState());
  readonly photos = computed(() => this.state().photos);
  readonly page = computed(() => this.state().page);
  readonly pages = computed(() => this.state().pages);
  readonly error = computed(() => this.state().error);
  readonly loading = computed(() => this.state().loading);
  readonly endOfPage = computed(() => this.page() === this.pages());

  // Sources
  readonly searchControl = new FormControl({
    value: getSavedState().search,
    disabled: false,
  });

  readonly search$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    filter((a) => !!a && a.length >= 3),
    debounceTime(300),
    distinctUntilChanged()
  );

  readonly searchResults$ = this.search$.pipe(
    map((search) => ({ search: search || '', page: 1 })), // TypeScript thinks it's string | null
    switchMap(({ search, page }) =>
      this.photoService.searchPublicPhotos(search, page).pipe(
        tap(() => {
          localStorage.setItem(
            PHOTO_STATE_KEY,
            JSON.stringify({ search, page })
          );
        }),
        catchError((error: unknown) => of({ error }))
      )
    ),
    share()
  );

  loadingChange$ = merge(
    this.search$.pipe(map(() => true)),
    this.searchResults$.pipe(map(() => false))
  ).pipe(map((loading) => ({ ...this.state(), loading })));

  resultsChange$ = this.searchResults$.pipe(
    map((result: { error: unknown } | FlickrAPIResponse) => {
      const state = this.state();
      if ('error' in result) {
        return { ...state, error: JSON.stringify(result.error) };
      } else {
        return {
          ...state,
          photos: result.photos.photo,
          pages: result.photos.pages,
          error: '',
        };
      }
    })
  );

  nextPage$ = new Subject<void>();
  previousPage$ = new Subject<void>();
  pageChange$ = merge(
    this.nextPage$.pipe(map(() => 1)),
    this.previousPage$.pipe(map(() => -1))
  ).pipe(map((change) => ({ ...this.state(), page: this.page() + change })));

  newState$ = merge(
    defer(() => of(getSavedState())),
    this.loadingChange$,
    this.resultsChange$,
    this.pageChange$
  );

  connection$ = connectSource(this.state, this.newState$);
}
