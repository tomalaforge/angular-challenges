import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService } from './topic.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NgIf],
  template: `
    <ng-container *ngIf="isLoading$(); else loading">
      <button (click)="openTopicModal()">Open Topic</button> .
    </ng-container>
    <ng-template #loading> loading.. </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics = toSignal(this.topicService.fakeGetHttpTopic().pipe(take(1)), {
    initialValue: [],
  });

  isLoading$ = computed(() => this.topics().length > 0);

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: this.topics(),
      },
    });
  }
}
