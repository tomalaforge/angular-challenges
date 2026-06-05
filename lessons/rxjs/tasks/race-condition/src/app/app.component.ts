import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openTopicModal()">Open Topic</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics: TopicType[] = [];

  ngOnInit(): void {
    this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1))
      .subscribe((topics) => (this.topics = topics));
  }

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: this.topics,
      },
    });
  }
}
