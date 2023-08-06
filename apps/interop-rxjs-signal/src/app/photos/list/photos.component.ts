import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { Photo } from '../photo.model';
import { PhotosStore } from './photos.store';
import { SearchBoxComponent } from '../../shared/ui/search-box.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    MatProgressBarModule,
    NgIf,
    NgFor,
    RouterLinkWithHref,
    SearchBoxComponent,
  ],
  template: `
    <h2 class="text-xl mb-2">Photos</h2>

    <app-search-box
      [query]="store.filter.query()"
      (search)="store.updateQuery($event)" />

    <section class="flex flex-col">
      <section class="flex gap-3 items-center">
        <button
          [disabled]="store.filter.page() === 1"
          [class.bg-gray-400]="store.filter.page() === 1"
          class="text-xl border rounded-md p-3"
          (click)="store.goToPreviousPage()">
          <
        </button>
        <button
          [disabled]="store.isLastPage()"
          [class.bg-gray-400]="store.isLastPage()"
          class="text-xl border rounded-md p-3"
          (click)="store.goToNextPage()">
          >
        </button>
        Page :{{ store.filter.page() }} / {{ store.totalPages() }}
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
      <footer *ngIf="store.error()" class="text-red-500">
        {{ store.error() }}
      </footer>
    </section>
  `,
  providers: [PhotosStore],
  host: { class: 'p-5 block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhotosComponent {
  readonly store = inject(PhotosStore);

  trackById(_: number, photo: Photo): string {
    return photo.id;
  }

  encode(photo: Photo): string {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
