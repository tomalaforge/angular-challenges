import {
  ChangeDetectionStrategy,
  Component,
  resource,
  ResourceStatus,
  signal,
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
    <app-expandable-card [(isExpanded)]="toLoad">
      <div title>Load Post</div>
      <div>
        @if (postResource.isLoading()) {
          Loading...
        } @else if (postResource.status() === ResourceStatus.Error) {
          Error...
        } @else {
          @for (post of postResource.value(); track post.id) {
            <div>{{ post.title }}</div>
          }
        }
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard],
})
export class Page2 {
  toLoad = signal(false);
  postResource = resource({
    request: () => ({ loading: this.toLoad() }),
    loader: async ({ request }) => {
      if (!request.loading) return;
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Failed to load posts');
      return await res.json();
    },
  });
  protected readonly ResourceStatus = ResourceStatus;
}
