import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoStore2 } from './photos2.store';

@Component({
  selector: 'app-photos',
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
        [formControl]="search"
        placeholder="find a photo" />
    </mat-form-field>

    <ng-container>
      <section class="flex flex-col">
        <section class="flex items-center gap-3">
          <button
            [disabled]="store.page() === 1"
            [class.bg-gray-400]="store.page() === 1"
            class="rounded-md border p-3 text-xl"
            (click)="store.setPageRelative(-1)">
            <
          </button>
          <button
            [disabled]="store.endOfPage()"
            [class.bg-gray-400]="store.endOfPage()"
            class="rounded-md border p-3 text-xl"
            (click)="store.setPageRelative(1)">
            >
          </button>
          Page : {{ store.page() }} / {{ store.pages() }}
        </section>

        @if (store.loading()) {
          <mat-progress-bar mode="query" class="mt-5" />
        }
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
          } @empty {
            <div>No Photos found. Type a search word.</div>
          }
        </ul>
        <footer class="text-red-500">{{ store.error() }}</footer>
      </section>
    </ng-container>
  `,
  providers: [PhotoStore2],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  protected readonly store = inject(PhotoStore2);
  protected readonly search = new FormControl();

  constructor() {
    this.search.setValue(this.store.search());

    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchTerm) => {
        this.store.setSearch(searchTerm);
      });
  }

  encode(photo: Photo): string {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
