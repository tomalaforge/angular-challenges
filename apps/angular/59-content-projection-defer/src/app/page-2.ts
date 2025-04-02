import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  ResourceStatus,
  runInInjectionContext,
} from '@angular/core';
import { ExpandableCard } from './expandable-card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card (expanded)="loadPosts()">
      <div title>Load Post</div>
      <div>
        @if (postResource?.isLoading()) {
          Loading...
        } @else if (postResource?.status() === ResourceStatus.Error) {
          Error...
        } @else {
          @for (post of postResource?.value() || []; track post.id) {
            <div>{{ post.title }}</div>
          }
        }
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard],
  standalone: true,
})
export class Page2 {
  private readonly injector = inject(Injector);
  public postResource: ReturnType<typeof httpResource<Post[]>> | null = null;
  protected readonly ResourceStatus = ResourceStatus;

  loadPosts() {
    if (!this.postResource) {
      runInInjectionContext(this.injector, () => {
        this.postResource = httpResource<Post[]>(
          'https://jsonplaceholder.typicode.com/posts',
        );
      });
    }
  }
}
