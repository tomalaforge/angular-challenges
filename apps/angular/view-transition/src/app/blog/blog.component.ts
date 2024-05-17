import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';
import { first } from 'rxjs';
import { BlogStore } from '../store';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [ThumbnailComponent, LetDirective],
  template: `
    <div
      class="app-header fixed left-0  right-0 top-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md">
      Blog List
    </div>

    <div
      class="my-20 flex h-screen flex-col items-center gap-10 border p-10"
      *ngrxLet="store.selectedPostIndex() as postIndex">
      @for (post of store.postEntities(); track post.id) {
        <blog-thumbnail
          [post]="post"
          [class.transition]="$index === postIndex" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent implements OnInit {
  readonly store = inject(BlogStore);

  readonly windowScrollY = toObservable(this.store.scrollY);

  ngOnInit(): void {
    /**
     * Use toObservable to consume only the first of store's
     * scrollY value (when blog component is initialized).
     * Another option would be the effect() callback,
     * but this callback is always called when scrollY signal is updated
     * and thus is called twice when we land to and leave of the blog component.
     */
    this.windowScrollY
      .pipe(first())
      .subscribe((scrollY) =>
        setTimeout(() => window.scrollTo({ top: scrollY, behavior: 'smooth' })),
      );
  }
}
