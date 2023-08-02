import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { Photo } from '../photo.model';
import { PhotoStore } from './photos.store';
import { injectAutoSignal } from '../inject-auto-signal';

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
    <h2 class="text-xl mb-2">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="store.searchControl"
        placeholder="write an article" />
    </mat-form-field>

    <ng-container>
      <section class="flex flex-col">
        <section class="flex gap-3 items-center">
          <button
            [disabled]="store.page() === 1"
            [class.bg-gray-400]="store.page() === 1"
            class="text-xl border rounded-md p-3"
            (click)="store.previousPage()">
            <
          </button>
          <button
            [disabled]="store.endOfPage()"
            [class.bg-gray-400]="store.endOfPage()"
            class="text-xl border rounded-md p-3"
            (click)="store.nextPage()">
            >
          </button>
          Page :{{ store.page() }} / {{ store.pages() }}
        </section>
        <mat-progress-bar
          mode="query"
          *ngIf="store.loading()"
          class="mt-5"></mat-progress-bar>
        <ul
          class="flex flex-wrap gap-4"
          *ngIf="store.photos() && store.photos().length > 0; else noPhoto">
          <li *ngFor="let photo of store.photos(); trackBy: trackById">
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
          {{ store.error() }}
        </footer>
      </section>
    </ng-container>
  `,
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  store = injectAutoSignal(PhotoStore);

  trackById(index: number, photo: Photo) {
    return photo.id;
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
