import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  OnInit,
  output,
  ResourceStatus,
  signal,
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
  selector: '[enableRequest]',
})
export class EnableRequestDirective implements OnInit {
  enabled = output<void>();

  ngOnInit(): void {
    this.enabled.emit();
  }
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card>
      <div title>Load Post</div>
      <div>
        <ng-template [cardContentTemplate] let-state>
          @if (state.expanded) {
            <div enableRequest (enabled)="requestEnabled.set(true)">
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
          }
        </ng-template>
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExpandableCard,
    EnableRequestDirective,
    CardContentTemplateDirective,
  ],
})
export class Page2 {
  public postResource = httpResource<Post[]>(() =>
    this.requestEnabled()
      ? 'https://jsonplaceholder.typicode.com/posts'
      : undefined,
  );
  protected readonly ResourceStatus = ResourceStatus;

  protected requestEnabled = signal(false);
}
