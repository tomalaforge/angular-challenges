import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

interface PhotoState {
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
export class PhotoStore {
  private photoService = inject(PhotoService);

  // Convert state to signals
  private state = signal<PhotoState>(this.loadInitialState());

  // Computed values
  readonly photos = computed(() => this.state().photos);
  readonly search = computed(() => this.state().search);
  readonly page = computed(() => this.state().page);
  readonly pages = computed(() => this.state().pages);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly endOfPage = computed(() => this.page() === this.pages());

  constructor() {
    // Initialize search on startup
    this.searchPhotos();
  }

  private loadInitialState(): PhotoState {
    const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
    if (!savedJSONState) return initialState;

    const savedState = JSON.parse(savedJSONState);
    return {
      ...initialState,
      search: savedState.search,
      page: savedState.page,
    };
  }

  updateSearch(search: string) {
    this.state.update((state) => ({
      ...state,
      search,
      page: 1,
    }));
    this.searchPhotos();
  }

  nextPage() {
    if (this.endOfPage()) return;
    this.state.update((state) => ({
      ...state,
      page: state.page + 1,
    }));
    this.searchPhotos();
  }

  previousPage() {
    if (this.page() === 1) return;
    this.state.update((state) => ({
      ...state,
      page: state.page - 1,
    }));
    this.searchPhotos();
  }

  private searchPhotos() {
    const { search, page } = this.state();
    if (search.length < 3) return;

    this.state.update((state) => ({ ...state, loading: true, error: '' }));

    this.photoService
      .searchPublicPhotos(search, page)
      .pipe(
        takeUntilDestroyed(),
        tapResponse(
          ({ photos: { photo, pages } }) => {
            this.state.update((state) => ({
              ...state,
              loading: false,
              photos: photo,
              pages,
            }));
            localStorage.setItem(
              PHOTO_STATE_KEY,
              JSON.stringify({ search, page }),
            );
          },
          (error: unknown) => {
            this.state.update((state) => ({
              ...state,
              error,
              loading: false,
            }));
          },
        ),
      )
      .subscribe();
  }
}
