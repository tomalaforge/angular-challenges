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
    <app-expandable-card (expanded)="onExpansion($event)">
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
  // Set this signal to true to start fetching the posts
  private readonly $loader = signal(false);

  // Fetch posts from the API
  public postRessource = httpResource<Post[]>(() =>
    this.$loader() ? 'https://jsonplaceholder.typicode.com/posts' : undefined,
  );
  protected readonly ResourceStatus = ResourceStatus;

  onExpansion(isExpanded: boolean) {
    if (isExpanded && !this.postRessource.hasValue()) {
      this.$loader.set(true);
    }
  }
}
