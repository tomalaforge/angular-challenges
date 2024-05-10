import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import {
  injectQuery,
  injectQueryClient,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import {
  debounceTime,
  distinctUntilChanged,
  lastValueFrom,
  skip,
  startWith,
} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_PAGE = 'photo_state_page';
const PHOTO_STATE_SEARCH = 'photo_state_search';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    RouterLinkWithHref,
  ],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="searchField"
        placeholder="find a photo" />
    </mat-form-field>

    <section class="flex flex-col">
      <section class="flex items-center gap-3">
        <button
          [disabled]="page() === 1"
          [class.bg-gray-400]="page() === 1"
          class="rounded-md border p-3 text-xl"
          (click)="previousPage()">
          <
        </button>
        <button
          [disabled]="!hasMore()"
          [class.bg-gray-400]="!hasMore()"
          class="rounded-md border p-3 text-xl"
          (click)="nextPage()">
          >
        </button>
        Page :{{ page() }} / {{ photoQuery.data()?.photos?.pages }}
      </section>
      @if (photoQuery.isFetching() && !photoQuery.isLoading()) {
        <mat-progress-bar mode="query" class="mt-5" />
      }

      @if (photoQuery.isLoading()) {
        <mat-progress-bar mode="query" class="mt-5" />
      } @else if (photoQuery.isError()) {
        <footer class="text-red-500">
          {{ photoQuery.error() }}
        </footer>
      } @else {
        <ul class="flex flex-wrap gap-4">
          @for (photo of photoQuery.data()?.photos?.photo; track photo.id) {
            <li>
              <a routerLink="detail" [queryParams]="{ photo: encode(photo) }">
                <img
                  src="{{ photo.url_q }}"
                  alt="{{ photo.title }}"
                  class="image" />
              </a>
            </li>
          } @empty {
            <div>No Photos found. Type a search word.</div>
          }
        </ul>
      }
    </section>
  `,
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  photoService = inject(PhotoService);
  queryClient = injectQueryClient();

  searchField = new FormControl(
    localStorage.getItem(PHOTO_STATE_SEARCH) ?? '',
    { nonNullable: true },
  );

  page = signal(Number(localStorage.getItem(PHOTO_STATE_PAGE) ?? '1'));
  hasMore = computed(
    () => this.photoQuery.data()?.photos?.pages ?? 0 > this.page(),
  );
  searchTerm = toSignal(
    this.searchField.valueChanges.pipe(
      startWith(this.searchField.value),
      debounceTime(500),
      distinctUntilChanged(),
      skip(1),
      tap(() => this.page.set(1)),
    ),
    {
      initialValue: this.searchField.value,
    },
  );

  photoQuery = injectQuery(() => ({
    queryKey: ['photos', this.searchTerm(), this.page()],
    queryFn: () =>
      lastValueFrom(
        this.photoService.searchPublicPhotos(this.searchTerm(), this.page()),
      ),
    placeholderData: keepPreviousData,
  }));

  constructor() {
    console.log(
      localStorage.getItem(PHOTO_STATE_SEARCH),
      localStorage.getItem(PHOTO_STATE_PAGE),
    );

    effect(() => {
      // Prefetch the next page!
      if (!this.photoQuery.isPlaceholderData() && this.hasMore()) {
        this.queryClient.prefetchQuery({
          queryKey: ['photos', this.searchTerm(), this.page() + 1],
          queryFn: () =>
            lastValueFrom(
              this.photoService.searchPublicPhotos(
                this.searchTerm(),
                this.page() + 1,
              ),
            ),
        });
      }
    });

    effect(() => {
      localStorage.setItem(PHOTO_STATE_SEARCH, this.searchTerm());
    });

    effect(() => {
      localStorage.setItem(PHOTO_STATE_PAGE, String(this.page()));
    });
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }

  previousPage() {
    this.page.update((old) => Math.max(old - 1, 0));
  }

  nextPage() {
    this.page.update((old) => (this.hasMore() ? old + 1 : old));
  }
}
