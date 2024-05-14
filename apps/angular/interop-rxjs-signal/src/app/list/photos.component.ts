import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  skipWhile,
  tap,
} from 'rxjs';
import { Photo } from '../photo.model';
import { LoadingStatePipe } from '../shared/pipe/loading-state.pipe';
import { PhotosStore } from './photos.store';

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
    LoadingStatePipe,
  ],
  templateUrl: './photos.component.html',
  host: {
    class: 'p-5 block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhotosComponent implements OnInit {
  readonly store = inject(PhotosStore);
  readonly search = new FormControl();

  search$ = toObservable(this.store.filter.search)
    .pipe(
      first(),
      tap((search) => this.search.patchValue(search)),
    )
    .subscribe();

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        skipWhile(() => !this.search$.closed),
        debounceTime(300),
        distinctUntilChanged(),
        tap((search) => this.store.updateSearch(search)),
      )
      .subscribe();
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
