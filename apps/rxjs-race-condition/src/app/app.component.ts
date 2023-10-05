import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
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
  imports: [NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$: Observable<TopicType[]> = this.topicService
    .fakeGetHttpTopic()
    .pipe(take(1));

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: topics,
      },
    });
  }
}
