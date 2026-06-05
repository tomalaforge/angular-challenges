/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, input, signal } from '@angular/core';
import { take } from 'rxjs';
import { AppService } from './app.service';
import { TopicType } from './localDB.service';

@Component({
  selector: 'button-delete-topic',
  template: `
    <button (click)="deleteTopic()"><ng-content /></button>
    <div>{{ message() }}</div>
  `,
})
export class ButtonDeleteComponent {
  readonly topic = input.required<TopicType>();

  message = signal('');

  private service = inject(AppService);

  deleteTopic() {
    this.service
      .deleteOldTopics(this.topic())
      .pipe(take(1))
      .subscribe((result) =>
        this.message.set(
          result
            ? `All ${this.topic()} have been deleted`
            : `Error: deletion of some ${this.topic()} failed`,
        ),
      );
  }
}

@Component({
  imports: [ButtonDeleteComponent],
  selector: 'app-root',
  template: `
    @for (info of allInfo(); track info.id) {
      <div>{{ info.id }} - {{ info.topic }}</div>
    }

    <button-delete-topic topic="food">Delete Food</button-delete-topic>
    <button-delete-topic topic="sport">Delete Sport</button-delete-topic>
    <button-delete-topic topic="book">Delete Book</button-delete-topic>
  `,
})
export class AppComponent {
  private service = inject(AppService);

  allInfo = this.service.getAllInfo;
}
