import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    @if (topics()) {
      <button (click)="openTopicModal()">Open Topic</button>
    } @else {
      ...Wait for data
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topics = toSignal(inject(TopicService).fakeGetHttpTopic());

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: this.topics(),
      },
    });
  }
}
