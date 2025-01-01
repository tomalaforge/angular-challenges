import { NgFor, NgIf } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  skipWhile,
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotosSignalStore } from './photos-signal.store';

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
  templateUrl: './photos.component.html',
  providers: [PhotosSignalStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  store = inject(PhotosSignalStore);

  photos = this.store.photos;
  search = this.store.searchToken;
  page = this.store.page;
  pages = this.store.pages;
  loading = this.store.loading;
  error = this.store.error;
  isLastPage = this.store.isLastPage;

  searchInput$ = combineLatest([
    toObservable(this.search),
    toObservable(this.page),
  ]).pipe(
    filter(([search]) => search.length >= 3),
    map(([search, page]) => ({ search, page })),
  );

  constructor() {
    effect(() => {
      if (!this.formInit) {
        this.searchForm.setValue(this.search());
      }
      this.formInit = true;
    });
  }

  private formInit = false;
  searchForm = new FormControl();

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        skipWhile(() => !this.formInit),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((search) => this.store.setSearchToken(search));

    this.store.searchPhotos(this.searchInput$);
  }

  trackById(index: number, photo: Photo) {
    return photo.id;
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
