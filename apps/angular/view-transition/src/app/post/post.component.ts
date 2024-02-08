import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThumbnailHeaderComponent } from '../blog/thumbnail-header.component';
import { fakeTextChapters, posts } from '../data';
import { PostHeaderComponent } from './post-header.component';

@Component({
  selector: 'post',
  standalone: true,
  imports: [
    ThumbnailHeaderComponent,
    NgOptimizedImage,
    PostHeaderComponent,
    RouterLink,
  ],
  animations: [
    trigger('fadeInOnEnter', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([
            style({
              visibility: 'visible',
              opacity: 0,
              easing: 'ease',
              offset: 0,
            }),
            style({ opacity: 1, easing: 'ease', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
  template: `
    <div class="relative w-full max-w-[800px]">
      <button
        routerLink="/"
        class="absolute left-2 top-2 z-20 rounded-md border bg-white p-2">
        Back
      </button>
      <img
        [src]="post().image"
        class="animation-cover h-44 w-full object-cover"
        alt="" />
      <h2 class="p-7 text-center text-5xl">{{ post().title }}</h2>
      <post-header [date]="post().date" class="mb-20" />
      @for (chapter of fakeTextChapter; track $index) {
        <p class="mt-6 px-3" [@fadeInOnEnter]>{{ chapter }}</p>
      }
    </div>
  `,
  styles: ['.animation-cover{view-transition-name: animation-cover;}'],
  host: {
    class: 'flex h-full justify-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostComponent {
  id = input.required<string>();
  post = computed(() => posts.filter((p) => p.id === this.id())[0]);
  fakeTextChapter = fakeTextChapters;
}
