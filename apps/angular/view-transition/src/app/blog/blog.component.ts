import { ChangeDetectionStrategy, Component } from '@angular/core';
import { posts } from '../data';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [ThumbnailComponent],
  template: `
    <div
      class="fixed left-0  right-0 top-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md">
      Blog List
    </div>
    <div class="my-20 flex h-screen flex-col items-center gap-10 border p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail [post]="post" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent {
  // implements OnInit
  posts = posts;

  /*
  // this kind of works -> need to localize this to the post where the click happens
  // check if back-transition exists -> remove it on OnInit

  router = inject(Router);
  document = inject(DOCUMENT);

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.router.events.subscribe((val: any) => {
      if (val.url === '/') {
        this.document.documentElement.classList.add('back-transition');
      } else {
        this.document.documentElement.classList.remove('back-transition');
      }
    });
  }
  */
}
