import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  template: `
    <div class="dialog-container">
      <h1 mat-dialog-title>Available Topics</h1>

      <div mat-dialog-content>
        <ul class="topic-list">
          @for (topic of data.topics; track topic) {
            <li class="topic-item">
              <span class="topic-icon">📌</span>
              {{ topic }}
            </li>
          }
        </ul>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close color="primary">Close</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 20px;
      }

      .topic-list {
        list-style: none;
        padding: 0;
        margin: 20px 0;
      }

      .topic-item {
        display: flex;
        align-items: center;
        padding: 12px;
        margin: 8px 0;
        background-color: #f5f5f5;
        border-radius: 8px;
        transition: all 0.2s ease;

        &:hover {
          background-color: #eeeeee;
          transform: translateX(5px);
        }
      }

      .topic-icon {
        margin-right: 12px;
        font-size: 1.2em;
      }

      mat-dialog-actions {
        margin-top: 20px;
      }
    `,
  ],
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
