import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { startWith, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <button (click)="openTopicModal()">Open Topic</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics: TopicType[] | string[] = [];

  ngOnInit(): void {
    this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1), startWith(['Politic', 'Culture', 'Nature']))
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
