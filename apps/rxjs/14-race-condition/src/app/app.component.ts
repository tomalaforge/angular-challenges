import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    @if (topics$ | async; as topics) {
      <button (click)="openTopicModal(topics)">Open Topic</button>
    }
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$ = this.topicService.fakeGetHttpTopic();

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics,
      },
    });
  }
}
