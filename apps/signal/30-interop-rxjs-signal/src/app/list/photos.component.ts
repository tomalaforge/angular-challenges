import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { distinctUntilChanged } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoStore } from './photos.store';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    LetDirective,
    RouterLinkWithHref,
  ],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="search"
        placeholder="find a photo" />
    </mat-form-field>

    <section class="flex flex-col">
      <section class="flex items-center gap-3">
        <button
          [disabled]="store.page() === 1"
          [class.bg-gray-400]="store.page() === 1"
          class="rounded-md border p-3 text-xl"
          (click)="store.previousPage()">
          <
        </button>
        <button
          [disabled]="store.lastPage()"
          [class.bg-gray-400]="store.lastPage()"
          class="rounded-md border p-3 text-xl"
          (click)="store.nextPage()">
          >
        </button>
        Page :{{ store.page() }} / {{ store.pages() }}
      </section>
      @if (store.loading()) {
        <mat-progress-bar mode="query" class="mt-5"></mat-progress-bar>
      }

      @if (store.photos() && store.photos().length) {
        <ul class="flex flex-wrap gap-4">
          @for (photo of store.photos(); track photo.id) {
            <li>
              <a routerLink="detail" [queryParams]="{ photo: encode(photo) }">
                <img
                  src="{{ photo.url_q }}"
                  alt="{{ photo.title }}"
                  class="image" />
              </a>
            </li>
          }
        </ul>
      } @else {
        <ng-template>
          <div>No Photos found. Type a search word.</div>
        </ng-template>
      }

      <footer class="text-red-500">
        {{ store.error() }}
      </footer>
    </section>
  `,
  host: {
    class: 'p-5 block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhotosComponent {
  store = inject(PhotoStore);

  search = new FormControl();
  #formInit = false;

  constructor() {
    this.search.valueChanges
      .pipe(takeUntilDestroyed(), distinctUntilChanged())
      .subscribe((value) => this.store.updateSearch(value));

    toObservable(this.store.filter)
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged(
          (prev, curr) =>
            prev.page === curr.page && prev.search === curr.search,
        ),
      )
      .subscribe((filter) => {
        if (!this.#formInit) {
          this.#formInit = true;
          this.search?.setValue(filter.search);
        }

        if (
          (filter.page > this.store.pages() && this.store.pages() !== 0) ||
          !filter.page
        ) {
          this.store.previousPage();
        } else {
          this.store.getPhotos({ ...filter });
        }
      });
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
