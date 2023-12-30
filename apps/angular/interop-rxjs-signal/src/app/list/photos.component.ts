import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { Photo } from '../photo.model';
import { SearchBoxComponent } from '../ui/search-box.component';
import { PhotosStore } from './photos.store';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatProgressBarModule, RouterLinkWithHref, SearchBoxComponent],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>
    <app-search-box [term]="store.term()" (search)="search($event)" />
    <section class="flex flex-col">
      <section class="flex items-center gap-3">
        <button
          class="rounded-md border p-3 text-xl"
          [class.bg-gray-400]="store.page() === 1"
          (click)="store.goToPreviousPage()">
          <
        </button>
        <button
          class="rounded-md border p-3 text-xl"
          [disabled]="store.isLastPage()"
          [class.bg-gray-400]="store.isLastPage()"
          (click)="store.goToNextPage()">
          >
        </button>
        Page :{{ store.page() }} / {{ store.total() }}
      </section>

      @if (store.loading()) {
        <mat-progress-bar mode="query" class="mt-5"></mat-progress-bar>
      }
      @if (store.error(); as error) {
        <footer class="text-red-500">{{ error }}</footer>
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
    </section>
  `,
  providers: [PhotosStore],
  host: { class: 'p-5 block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhotosComponent {
  readonly store = inject(PhotosStore);

  encode(photo: Photo): string {
    return encodeURIComponent(JSON.stringify(photo));
  }

  search(term: string): void {
    this.store.get(term);
  }
}
