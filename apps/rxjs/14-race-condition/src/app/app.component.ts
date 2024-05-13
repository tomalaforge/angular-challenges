import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    @if (topics()) {
      <button (click)="openTopicModal()">Open Topic</button>
    } @else {
      <p>Loading...</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AppComponent {
  dialog = inject(MatDialog);
  topics = toSignal(inject(TopicService).fakeGetHttpTopic());

  openTopicModal() {
    this.dialog.open(TopicModalComponent, { data: { topics: this.topics() } });
  }
}
