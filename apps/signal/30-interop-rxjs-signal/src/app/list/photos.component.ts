import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoStore } from './photos.store';
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
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="searchTerm"
        placeholder="find a photo" />
    </mat-form-field>

    @if (store; as store) {
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
            [disabled]="store.endOfPage()"
            [class.bg-gray-400]="store.endOfPage()"
            class="rounded-md border p-3 text-xl"
            (click)="store.nextPage()">
            >
          </button>
          Page :{{ store.page() }} / {{ store.pages() }}
        </section>
        @if (store.loading()) {
          <mat-progress-bar
            mode="query"
            *ngIf="store.loading()"
            class="mt-5"></mat-progress-bar>
        }

        @if (store.photos() && store.photos().length > 0) {
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
          <div>No Photos found. Type a search word.</div>
        }
        <footer class="text-red-500">
          {{ store.error() }}
        </footer>
      </section>
    }
  `,
  providers: [PhotoStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  store = inject(PhotoStore);
  searchTerm = new FormControl(this.store.searchTerm());

  private searchInput = this.searchTerm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.searchInput
      .pipe(
        filter((searchInputValue) => !!searchInputValue),
        tap((searchInputValue) => {
          this.store.search(searchInputValue!);
        }),
      )
      .subscribe();
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
