import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
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
    <app-expandable-card (expanded)="triggerFetch.set($event)">
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
  protected triggerFetch = signal(false);
  public postResource = httpResource<Post[]>(() =>
    !this.triggerFetch()
      ? undefined
      : 'https://jsonplaceholder.typicode.com/posts',
  );
  protected readonly ResourceStatus = ResourceStatus;
}
