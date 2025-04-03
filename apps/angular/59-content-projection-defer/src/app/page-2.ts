import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
  ResourceStatus,
  viewChild,
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
    <app-expandable-card>
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
  protected readonly ResourceStatus = ResourceStatus;
  private readonly URL = 'https://jsonplaceholder.typicode.com/posts';

  private readonly card = viewChild.required(ExpandableCard);
  private readonly isCardOpened = computed(() => this.card().isExpanded());

  protected readonly postResource = resource<Post[], { isCardOpened: boolean }>(
    {
      loader: async ({ request }) =>
        request.isCardOpened
          ? await fetch(this.URL).then((res) => res.json())
          : [],
      request: () => ({ isCardOpened: this.isCardOpened() }),
    },
  );
}
