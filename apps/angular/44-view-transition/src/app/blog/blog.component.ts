import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { posts } from '../data';
import { PostService } from '../post.service';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [ThumbnailComponent],
  template: `
    <div
      class="blog-header fixed left-0  right-0 top-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md">
      Blog List
    </div>
    <div class="my-20 flex h-screen flex-col items-center gap-10 border p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail
          [post]="post"
          [class.active]="post.id === postService.activeId()" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent {
  posts = posts;
  readonly postService = inject(PostService);
}
