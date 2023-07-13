import { NgFor, NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { debounceTime, finalize, switchMap } from 'rxjs';
import { Photo } from '../photo.model';
import { SignalState } from '../signal-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FlickrAPIResponse, PhotoService } from '../photos.service';
import { tap } from 'rxjs/operators';

export type PhotoComponentState = {
  photosResult: FlickrAPIResponse | undefined;
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
};
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
    <ng-container *ngIf="vm() as vm">
      <h2 class="text-xl mb-2">Photos</h2>
      <mat-form-field appearance="fill">
        <mat-label>Search</mat-label>
        <input
          type="text"
          matInput
          [formControl]="searchCtrl"
          placeholder="write an article" />
      </mat-form-field>

      <section class="flex flex-col">
        <section class="flex gap-3 items-center">
          <button
            [disabled]="vm.page === 1"
            [class.bg-gray-400]="vm.page === 1"
            class="text-xl border rounded-md p-3"
            (click)="previousPage()">
            <
          </button>
          <button
            [disabled]="vm.endOfPage"
            [class.bg-gray-400]="vm.endOfPage"
            class="text-xl border rounded-md p-3"
            (click)="nextPage()">
            >
          </button>
          Page :{{ vm.page }} / {{ vm.pages }}
        </section>
        <mat-progress-bar
          mode="query"
          *ngIf="vm.loading"
          class="mt-5"></mat-progress-bar>
        <ul
          class="flex flex-wrap gap-4"
          *ngIf="vm.photos && vm.photos.length > 0; else noPhoto">
          <li *ngFor="let photo of vm.photos; trackBy: trackById">
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
          {{ vm.error }}
        </footer>
      </section>
    </ng-container>
  `,
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent extends SignalState<PhotoComponentState> {
  private readonly photoService = inject(PhotoService);
  protected readonly vm = this.selectMany(
    ['photos', 'search', 'page', 'pages', 'loading', 'error'],
    ({ photos, search, page, pages, loading, error }) => {
      return {
        photos,
        search,
        pages,
        page,
        loading,
        error,
        endOfPage: page === pages,
      };
    }
  );
  protected readonly searchCtrl = new FormControl();

  constructor() {
    super();
    this.initialize({
      photosResult: undefined,
      photos: [],
      search: '',
      page: 1,
      pages: 1,
      loading: false,
      error: '',
    });
    const photosResult$ = toObservable(
      this.selectMany(['search', 'page'])
    ).pipe(
      debounceTime(300),
      tap(() => this.patch({ loading: true })),
      switchMap(({ search, page }) =>
        this.photoService
          .searchPublicPhotos(search, page)
          .pipe(finalize(() => this.patch({ loading: false })))
      )
    );
    const photos = this.select(
      'photosResult',
      (photosResult) => photosResult?.photos.photo as Photo[]
    );

    this.connect({
      search: toSignal(this.searchCtrl.valueChanges, {
        initialValue: this.searchCtrl.value,
      }),
      photosResult: toSignal(photosResult$),
      photos,
    });

    // I would prefer to call a search function for the template
    // but it is to prove the concept of effects in the signalstate
    effect(
      () => {
        if (this.select('search')) {
          this.patch({ page: 1 });
        }
      },
      { allowSignalWrites: true }
    );
  }

  protected previousPage(): void {
    this.patch({ page: this.snapshot.page - 1 });
  }

  protected nextPage(): void {
    this.patch({ page: this.snapshot.page + 1 });
  }

  protected trackById(index: number, photo: Photo) {
    return photo.id;
  }

  protected encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
