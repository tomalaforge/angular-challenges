import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  imports: [NgFor, AsyncPipe],
  standalone: true,
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
  topicSubject$ = new BehaviorSubject<TopicType[]>([]);

  ngOnInit() {
    this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1))
      .subscribe((topics) => {
        this.topicSubject$.next(topics);
        //this.dialog.closeAll();
      });
  }

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics$: this.topicSubject$,
      },
    });
  }
}
