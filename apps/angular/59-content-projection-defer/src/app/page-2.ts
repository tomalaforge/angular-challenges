import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  ResourceStatus,
  viewChild,
} from '@angular/core';
import {
  CardContentTemplateDirective,
  ExpandableCard,
} from './expandable-card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Directive({
  selector: '[postResource]',
})
export class PostResourceDirective {
  readonly isLoading = computed(() => this.#postHttpResource.isLoading());
  readonly status = computed(() => this.#postHttpResource.status());
  readonly value = computed(() => this.#postHttpResource.value());

  readonly #postHttpResource = httpResource<Post[]>(
    () => 'https://jsonplaceholder.typicode.com/posts',
  );
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card>
      <div title>Load Post</div>
      <div>
        <ng-template [cardContentTemplate] let-state>
          <div postResource>
            @if (state.expanded) {
              @if (postResourceDir().isLoading()) {
                <div>Loading...</div>
              } @else if (postResourceDir().status() === ResourceStatus.Error) {
                <div>Error...</div>
              } @else {
                @for (post of postResourceDir().value(); track post.id) {
                  <div>{{ post.title }}</div>
                }
              }
            }
          </div>
        </ng-template>
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExpandableCard,
    PostResourceDirective,
    CardContentTemplateDirective,
  ],
})
export class Page2 {
  protected readonly ResourceStatus = ResourceStatus;

  protected readonly postResourceDir = viewChild.required(
    PostResourceDirective,
  );
}
