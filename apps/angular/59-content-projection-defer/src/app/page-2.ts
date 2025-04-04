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
    <app-expandable-card [(isExpanded)]="isExpanded">
      <div title>Load Post</div>
      <div>
        @if (postRessource.isLoading()) {
          Loading...
        } @else if (postRessource.status() === ResourceStatus.Error) {
          Error...
        } @else {
          @for (post of postRessource.value(); track post.id) {
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
  protected readonly ResourceStatus = ResourceStatus;

  public postRessource = httpResource<Post[]>(
    () => {
      return this.isExpanded()
        ? 'https://jsonplaceholder.typicode.com/posts'
        : undefined;
    },
    {
      defaultValue: [],
    },
  );

  isExpanded = signal(false);
}
