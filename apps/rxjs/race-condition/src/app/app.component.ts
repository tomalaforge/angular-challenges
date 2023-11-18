import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AsyncPipe, NgIf],
  template: `<ng-container *ngIf="topics$ | async as topic">
    <button (click)="openTopicModal(topic)">Open Topic</button>
  </ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$ = this.topicService.fakeGetHttpTopic().pipe(take(1));

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics,
      },
    });
  }
}
