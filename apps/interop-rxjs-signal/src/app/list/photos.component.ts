import { NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import {
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  pipe,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';
import { computedFrom } from '../utils/computed';

const PHOTO_STATE_KEY = 'photo_search';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetDirective,
    RouterLinkWithHref,
  ],
  template: `
    <h2 class="text-xl mb-2">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="searchForm"
        placeholder="write an article" />
    </mat-form-field>

    <section class="flex flex-col">
      <section class="flex gap-3 items-center">
        <button
          [disabled]="page() === 1"
          [class.bg-gray-400]="page() === 1"
          class="text-xl border rounded-md p-3"
          (click)="previousPage()">
          <
        </button>
        <button
          [disabled]="endOfPage()"
          [class.bg-gray-400]="endOfPage()"
          class="text-xl border rounded-md p-3"
          (click)="nextPage()">
          >
        </button>
        Page :{{ page() }} / {{ pages() }}
      </section>
      <mat-progress-bar
        mode="query"
        *ngIf="loading()"
        class="mt-5"></mat-progress-bar>
      <ul
        class="flex flex-wrap gap-4"
        *ngIf="photos() && photos().length > 0; else noPhoto">
        <li *ngFor="let photo of photos(); trackBy: trackById">
          <a routerLink="detail" [queryParams]="{ photo: encode(photo) }">
            <img
              src="{{ photo.url_q }}"
              alt="{{ photo.title }}"
              class="image" />
          </a>
        </li>
      </ul>
      <ng-template #noPhoto>
        <div>No Photos found. Type a search word.</div>
      </ng-template>
      <footer class="text-red-500">
        {{ error() }}
      </footer>
    </section>
  `,
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  private photoService = inject(PhotoService);

  searchForm = new FormControl('', { nonNullable: true });

  readonly page = signal(1);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly endOfPage = computed(() => this.page() >= this.pages());

  readonly search = toSignal(
    this.searchForm.valueChanges.pipe(
      filter((search) => search.length >= 3),
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  readonly photosAPI = computedFrom(
    [this.search, this.page],
    pipe(
      tap(() => this.loading.set(true)),
      switchMap(([search, page]) =>
        this.photoService.searchPublicPhotos(search, page).pipe(
          catchError((err: unknown) => {
            this.error.set(JSON.stringify(err));
            return EMPTY;
          }),
          finalize(() => this.loading.set(false))
        )
      ),
      startWith({ photos: { photo: [] as Photo[], pages: 0 } })
    )
  );

  readonly photos = computed(() => this.photosAPI().photos.photo);
  readonly pages = computed(() => this.photosAPI().photos.pages);

  constructor() {
    this.initStore();
    effect(() =>
      localStorage.setItem(
        PHOTO_STATE_KEY,
        JSON.stringify({ search: this.search(), page: this.page() })
      )
    );
  }

  nextPage = () => this.page.update((p) => p + 1);
  previousPage = () => this.page.update((p) => p - 1);

  trackById(index: number, photo: Photo) {
    return photo.id;
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }

  private initStore() {
    const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
    if (savedJSONState === null) return;
    const savedState = JSON.parse(savedJSONState);

    this.searchForm.setValue(savedState.search);
    this.page.set(savedState.page);
  }
}
