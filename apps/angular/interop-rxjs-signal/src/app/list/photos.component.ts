import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoSignalStore } from './photo-signal.store';
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
            [disabled]="signalStore.page() === 1"
            [class.bg-gray-400]="signalStore.page() === 1"
            class="rounded-md border p-3 text-xl"
            (click)="signalStore.previousPage()">
            <
          </button>
          <button
            [disabled]="signalStore.endOfPage()"
            [class.bg-gray-400]="signalStore.endOfPage()"
            class="rounded-md border p-3 text-xl"
            (click)="signalStore.nextPage()">
            >
          </button>
          Page :{{ signalStore.page() }} / {{ signalStore.pages() }}
        </section>
        <mat-progress-bar
          mode="query"
          *ngIf="signalStore.loading()"
          class="mt-5"></mat-progress-bar>
        <ul
          class="flex flex-wrap gap-4"
          *ngIf="
            signalStore.photos() && signalStore.photos().length > 0;
            else noPhoto
          ">
          <li *ngFor="let photo of signalStore.photos(); trackBy: trackById">
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
          {{ signalStore.error() }}
        </footer>
      </section>
    </ng-container>
  `,
  providers: [provideComponentStore(PhotoStore), PhotoSignalStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  readonly signalStore = inject(PhotoSignalStore);
  private readonly destroyRef = inject(DestroyRef);
  search = new FormControl();

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value.length >= 3),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue) => this.signalStore.setSearch(searchValue));
  }

  trackById(index: number, photo: Photo) {
    return photo.id;
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
