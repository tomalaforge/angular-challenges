/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { take } from 'rxjs';
import { AppService } from './app.service';
import { TopicType } from './localDB.service';
@Component({
  selector: 'button-delete-topic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="delete-container">
      <button
        [class]="'delete-button ' + topic()"
        (click)="deleteTopic()"
        [disabled]="isDeleting()">
        <ng-content />
      </button>
      <div
        [class]="'message ' + (isError() ? 'error' : 'success')"
        *ngIf="message()">
        {{ message() }}
      </div>
    </div>
  `,
  styles: [
    `
      .delete-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 10px 0;
      }

      .delete-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .delete-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .delete-button.food {
        background-color: #ff4d4d;
        color: white;
      }

      .delete-button.sport {
        background-color: #4caf50;
        color: white;
      }

      .delete-button.book {
        background-color: #2196f3;
        color: white;
      }

      .message {
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
      }

      .message.error {
        background-color: #ffebee;
        color: #c62828;
      }

      .message.success {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
    `,
  ],
})
export class ButtonDeleteComponent {
  readonly topic = input.required<TopicType>();

  message = signal('');
  isDeleting = signal(false);
  isError = signal(false);

  private service = inject(AppService);

  deleteTopic() {
    this.isDeleting.set(true);
    this.message.set('');

    this.service
      .deleteOldTopics(this.topic())
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.isError.set(!result);
          this.message.set(
            result
              ? `All ${this.topic()} have been deleted`
              : `Error: deletion of some ${this.topic()} failed`,
          );
        },
        complete: () => {
          this.isDeleting.set(false);
        },
      });
  }
}

@Component({
  standalone: true,
  imports: [ButtonDeleteComponent, CommonModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Topic Management</h1>

      <div class="info-list">
        <h2>Current Topics</h2>
        @for (info of allInfo(); track info.id) {
          <div class="info-item">
            <span class="info-id">#{{ info.id }}</span>
            <span class="topic-badge {{ info.topic }}">{{ info.topic }}</span>
          </div>
        }
      </div>

      <div class="actions">
        <h2>Delete Topics</h2>
        <button-delete-topic topic="food">
          Delete Food Topics
        </button-delete-topic>
        <button-delete-topic topic="sport">
          Delete Sport Topics
        </button-delete-topic>
        <button-delete-topic topic="book">
          Delete Book Topics
        </button-delete-topic>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
      }

      h2 {
        color: #666;
        margin-bottom: 20px;
      }

      .info-list {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
      }

      .info-item {
        display: flex;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #eee;
      }

      .info-id {
        font-weight: bold;
        margin-right: 10px;
        color: #666;
      }

      .topic-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        text-transform: uppercase;
      }

      .topic-badge.food {
        background-color: #ffebee;
        color: #c62828;
      }

      .topic-badge.sport {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      .topic-badge.book {
        background-color: #e3f2fd;
        color: #1565c0;
      }

      .actions {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class AppComponent {
  private service = inject(AppService);
  allInfo = this.service.getAllInfo;
}
