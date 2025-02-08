import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { posts } from '../data';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  imports: [ThumbnailComponent],
  template: `
    <div
      class="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md"
      style="view-transition-name: page-header">
      Blog List
    </div>
    <div
      #postsContainer
      class="my-20 flex h-screen flex-col items-center gap-10 border p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail
          [post]="post"
          #thumbnails
          [attr.data-post-id]="post.id" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent implements AfterViewInit {
  posts = posts;
  @ViewChildren('thumbnails') thumbnails!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Store thumbnail positions in sessionStorage
    this.thumbnails.forEach((thumbnail) => {
      const element = thumbnail.nativeElement;
      const postId = element.getAttribute('data-post-id');
      const rect = element.getBoundingClientRect();
      sessionStorage.setItem(
        `post-position-${postId}`,
        JSON.stringify({
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }),
      );
    });
  }
}
