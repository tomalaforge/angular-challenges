import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <ng-container *ngIf="topics$ | async as topics">
      <button [disabled]="topics.length === 0" (click)="openTopicModal(topics)">
        Open Topic
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  readonly topics$: Observable<TopicType[]> = this.topicService
    .fakeGetHttpTopic()
    .pipe(startWith([]));

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics,
      },
    });
  }
}

// faire une app qui fonctionne mais pas dans les tests e2e à cause du délai de la requete http.
