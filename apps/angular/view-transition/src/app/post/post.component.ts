import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
  template: `
    <div class="relative w-full max-w-[800px]">
      <button
        id="button{{ id() }}"
        routerLink="/"
        class="absolute left-2 top-2 z-20 rounded-md border bg-white p-2"
        (click)="back($event)">
        Back
      </button>
      <img [ngSrc]="post().image" alt="" width="960" height="540" />
      <h2 class="p-7 text-center text-5xl">{{ post().title }}</h2>
      <post-header [date]="post().date" class="mb-20" [id]="id()" />
      @for (chapter of fakeTextChapter; track $index) {
        <p class="mt-6 px-3">{{ chapter }}</p>
      }
    </div>
  `,
  host: {
    class: 'flex h-full justify-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostComponent {
  id = input.required<string>();
  post = computed(() => posts.filter((p) => p.id === this.id())[0]);

  fakeTextChapter = fakeTextChapters;

  document = inject(DOCUMENT);

  back(event: Event) {
    this.document.documentElement.setAttribute('class', '');
    if (event.target instanceof HTMLElement && event.target.id === 'button1') {
      this.document.documentElement.classList.add('red');
    } else if (
      event.target instanceof HTMLElement &&
      event.target.id === 'button2'
    ) {
      this.document.documentElement.classList.add('green');
    } else if (
      event.target instanceof HTMLElement &&
      event.target.id === 'button3'
    ) {
      this.document.documentElement.classList.add('blue');
    }
  }
}

/*
<post-header [date]="post().date" class="mb-20" [style.view-transition-name]="'post-header'" />

// You can't put animation on post-header.  
// You will get the movement but the picture and angular logo are already together.
*/
