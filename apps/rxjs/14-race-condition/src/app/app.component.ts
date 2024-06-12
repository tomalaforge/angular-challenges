import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

export type DialogData = {
  topics$: Observable<TopicType[]>;
};

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="openTopicModal()">Open Topic</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);

  openTopicModal() {
    const data: MatDialogConfig<DialogData> = {
      data: { topics$: this.topicService.fakeGetHttpTopic().pipe(take(1)) },
    };

    this.dialog.open(TopicModalComponent, data);
  }
}
