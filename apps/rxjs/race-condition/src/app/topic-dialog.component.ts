import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TopicService, TopicType } from './topic.service';

@Component({
  template: `
    <h1 mat-dialog-title>Show all Topics</h1>
    <div mat-dialog-content>
      @if (data$ | async; as data) {
        <ul>
          @for (topic of data; track topic) {
            <li>
              {{ topic }}
            </li>
          }
        </ul>
      }
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule, AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  topicService = inject(TopicService);
  data$: Observable<TopicType[]> = this.topicService.fakeGetHttpTopic();
}
