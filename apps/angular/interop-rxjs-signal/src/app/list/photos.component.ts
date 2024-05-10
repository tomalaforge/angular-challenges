import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotosStore } from './photos.store';

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
        [formControl]="search"
        placeholder="find a photo" />
    </mat-form-field>

    @if (vm(); as vm) {
      <section class="flex flex-col">
        <section class="flex items-center gap-3">
          <button
            [disabled]="vm.page === 1"
            [class.bg-gray-400]="vm.page === 1"
            class="rounded-md border p-3 text-xl"
            (click)="store.previousPage()">
            <
          </button>
          <button
            [disabled]="vm.endOfPage"
            [class.bg-gray-400]="vm.endOfPage"
            class="rounded-md border p-3 text-xl"
            (click)="store.nextPage()">
            >
          </button>
          Page :{{ vm.page }} / {{ vm.pages }}
        </section>
        @if (vm.loading) {
          <mat-progress-bar mode="query" class="mt-5" />
        }
        <ul class="flex flex-wrap gap-4">
          @for (photo of vm.photos; track photo.id) {
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
        <footer class="text-red-500">
          {{ vm.error }}
        </footer>
      </section>
    }
  `,
  providers: [PhotosStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  store = inject(PhotosStore);
  readonly vm = this.store.vm;

  // This approach for initializing the value seems clearer than using formInit
  search = new FormControl<string>(this.store.searchTerm(), {
    nonNullable: true,
  });
  // Now this is the only rxjs part (outside the http call). We need rxjs
  // here, because signals don't have the concept of time-based debouncing or
  // distinctUntilChanged, and because forms aren't signal-based.
  private searchValue = this.search.valueChanges.pipe(
    startWith(this.search.value),
    debounceTime(300),
    distinctUntilChanged(),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.searchValue.subscribe((search) => this.store.search(search));
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
