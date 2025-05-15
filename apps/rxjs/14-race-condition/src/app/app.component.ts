import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (topics()) {
      <button (click)="openModal()">Open Topic</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  topicService = inject(TopicService);
  matDialog = inject(MatDialog);
  topics = toSignal(this.topicService.fakeGetHttpTopic().pipe(take(1)));

  openModal(): void {
    this.matDialog.open(TopicModalComponent, {
      data: {
        topics: this.topics(),
      },
    });
  }
}
