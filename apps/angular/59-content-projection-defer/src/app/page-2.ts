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
    <app-expandable-card (onCardExpanded)="retrievePosts($event)">
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
  private cardWasAlreadyExpanded = signal(false);
  public postRessource = httpResource<Post[]>(() => {
    if (this.cardWasAlreadyExpanded()) {
      return 'https://jsonplaceholder.typicode.com/posts';
    }

    return;
  });
  protected readonly ResourceStatus = ResourceStatus;

  retrievePosts(cardExpanded: boolean) {
    if (!this.cardWasAlreadyExpanded()) {
      this.cardWasAlreadyExpanded.set(cardExpanded);
    }
  }
}
