import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThumbnailHeaderComponent } from '../blog/thumbnail-header.component';
import { fakeTextChapters, posts } from '../data';
import { PostHeaderComponent } from './post-header.component';

@Component({
  selector: 'post',
  imports: [
    ThumbnailHeaderComponent,
    NgOptimizedImage,
    PostHeaderComponent,
    RouterLink,
  ],
  template: `
    <div class="relative w-full max-w-[800px]" #postContainer>
      <thumbnail-header
        [date]="post().date"
        [style]="{ 'view-transition-name': 'post-header-' + post().id }" />
      <button
        routerLink="/"
        class="absolute left-2 top-2 z-20 rounded-md border bg-white p-2">
        Back
      </button>
      <img
        #postImage
        [ngSrc]="post().image"
        alt=""
        width="960"
        height="540"
        [style]="getImageTransitionStyle()" />
      <h2
        class="p-7 text-center text-5xl"
        [style]="{ 'view-transition-name': 'post-title-' + post().id }">
        {{ post().title }}
      </h2>
      <post-header
        [date]="post().date"
        class="mb-20"
        [style]="{ 'view-transition-name': 'post-header-' + post().id }" />
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
export default class PostComponent implements AfterViewInit {
  id = input.required<string>();
  post = computed(() => posts.filter((p) => p.id === this.id())[0]);
  fakeTextChapter = fakeTextChapters;

  @ViewChild('postImage') postImage!: ElementRef;
  @ViewChild('postContainer') postContainer!: ElementRef;

  private previousPosition: any = null;

  ngAfterViewInit() {
    // Get the stored position
    const storedPosition = sessionStorage.getItem(`post-position-${this.id()}`);
    if (storedPosition) {
      this.previousPosition = JSON.parse(storedPosition);
      this.applyInitialPosition();
    }

    // Animate to final position
    requestAnimationFrame(() => {
      this.postContainer.nativeElement.style.transform = 'none';
      this.postContainer.nativeElement.style.transition =
        'transform 0.3s ease-out';
    });
  }

  getImageTransitionStyle() {
    return {
      'view-transition-name': `post-image-${this.id()}`,
      'transform-origin': 'top left',
    };
  }

  private applyInitialPosition() {
    if (this.previousPosition) {
      const currentRect = this.postImage.nativeElement.getBoundingClientRect();
      const scaleX = this.previousPosition.width / currentRect.width;
      const scaleY = this.previousPosition.height / currentRect.height;
      const translateX = this.previousPosition.left - currentRect.left;
      const translateY = this.previousPosition.top - currentRect.top;

      this.postContainer.nativeElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    }
  }
}
