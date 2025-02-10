import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService } from './topic.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTopicModal()">
        Open Topics
      </button>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private dialog = inject(MatDialog);
  private topicService = inject(TopicService);

  openTopicModal() {
    // Get fresh topics data and then open modal
    this.topicService
      .fakeGetHttpTopic()
      .pipe(
        take(1),
        switchMap((topics) =>
          this.dialog
            .open(TopicModalComponent, {
              data: { topics },
              width: '400px',
            })
            .afterClosed(),
        ),
      )
      .subscribe();
  }
}
