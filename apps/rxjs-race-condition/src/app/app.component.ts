import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <button *ngIf="topics$ | async as topics" (click)="openTopicModal(topics)">
      Open Topic
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$ = this.topicService.topics$;

  openTopicModal(topics: { topics: TopicType[] }) {
    this.dialog.open(TopicModalComponent, { data: topics });
  }
}
