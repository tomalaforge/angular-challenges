import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';

import { Photo } from '../photo.model';
import { PhotosStore } from './photos.store';

@Component({
  selector: 'app-photos',
  imports: [
    FormsModule,
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
        [ngModel]="store.search()"
        (ngModelChange)="store.setSearch($event)"
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
          [disabled]="store.endOfPage()"
          [class.bg-gray-400]="store.endOfPage()"
          class="rounded-md border p-3 text-xl"
          (click)="store.nextPage()">
          >
        </button>
        Page :{{ store.page() }} / {{ store.pages() }}
      </section>
      @if (store.loading()) {
        <mat-progress-bar mode="query" class="mt-5"></mat-progress-bar>
      }
      @let photos = store.data();
      @if (photos && photos.length > 0) {
        <ul class="flex flex-wrap gap-4">
          @for (photo of photos; track photo.id; let i = $index) {
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
  `,
  providers: [PhotosStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  readonly store = inject(PhotosStore);

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
