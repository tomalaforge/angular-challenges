import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EnvironmentInjector,
  inject,
  InjectionToken,
  ResourceStatus,
  runInInjectionContext,
  viewChild,
} from '@angular/core';
import { ExpandableCard } from './expandable-card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostResources = new InjectionToken('Fetch Post resources', {
  providedIn: 'root',
  factory: () =>
    httpResource<Post[]>('https://jsonplaceholder.typicode.com/posts'),
});

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card>
      <div title>Load Post</div>
      <div>
        @if (postResource()?.isLoading()) {
          Loading...
        } @else if (postResource()?.status() === ResourceStatus.Error) {
          Error...
        } @else {
          @for (post of postResource()?.value(); track post.id) {
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
  private readonly environmentInjector = inject(EnvironmentInjector);

  private expandableCard = viewChild(ExpandableCard);

  protected postResource = computed(() => {
    if (this.expandableCard()?.isExpanded()) {
      return runInInjectionContext(this.environmentInjector, () => {
        return inject(PostResources);
      });
    }
    return undefined;
  });

  protected readonly ResourceStatus = ResourceStatus;
}
