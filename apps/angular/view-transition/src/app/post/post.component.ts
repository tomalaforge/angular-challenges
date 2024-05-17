import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { ThumbnailHeaderComponent } from '../blog/thumbnail-header.component';
import { fakeTextChapters } from '../data';
import { BlogStore } from '../store';
import { PostHeaderComponent } from './post-header.component';

@Component({
  selector: 'post',
  standalone: true,
  imports: [
    ThumbnailHeaderComponent,
    NgOptimizedImage,
    PostHeaderComponent,
    RouterLink,
    LetDirective,
  ],
  template: `
    @if (store.getPostById(id()); as post) {
      <div class="relative w-full max-w-[800px] transition">
        <button
          routerLink="/"
          class="absolute left-2 top-2 z-20 rounded-md border bg-white p-2">
          Back
        </button>
        <img
          [ngSrc]="post.image"
          alt=""
          width="960"
          height="540"
          class="post-image" />
        <h2 class="p-7 text-center text-5xl">{{ post.title }}</h2>
        <post-header [date]="post.date" class="mb-20" />
        @for (chapter of fakeTextChapter; track $index) {
          <p class="mt-6 px-3">{{ chapter }}</p>
        }
      </div>
    } @else {
      <div>There is no post with the provided identifier.</div>
    }
  `,
  host: {
    class: 'flex h-full justify-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostComponent implements OnInit {
  readonly id = input.required<string>();

  readonly store = inject(BlogStore);

  fakeTextChapter = fakeTextChapters;

  ngOnInit(): void {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }
}
