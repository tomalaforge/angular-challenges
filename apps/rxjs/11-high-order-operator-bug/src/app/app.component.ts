/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { AppService } from './app.service';
import { TopicType } from './localDB.service';

@Component({
  standalone: true,
  selector: 'button-delete-topic',
  imports: [AsyncPipe],
  template: `
    <button (click)="deleteTopic()"><ng-content></ng-content></button>
    <div>{{ message$$ | async }}</div>
  `,
})
export class ButtonDeleteComponent {
  @Input() topic!: TopicType;

  message$$ = new BehaviorSubject<string>('');

  private service = inject(AppService);

  deleteTopic() {
    this.service
      .deleteOldTopics(this.topic)
      .pipe(take(1))
      .subscribe((result) =>
        this.message$$.next(
          result
            ? `All ${this.topic} have been deleted`
            : `Error: deletion of some ${this.topic} failed`,
        ),
      );
  }
}

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, ButtonDeleteComponent],
  selector: 'app-root',
  template: `
    <div *ngFor="let item of all$ | async">
      {{ item.id }} - {{ item.topic }}
    </div>

    <button-delete-topic topic="food">Delete Food</button-delete-topic>
    <button-delete-topic topic="sport">Delete Sport</button-delete-topic>
    <button-delete-topic topic="book">Delete Book</button-delete-topic>
  `,
})
export class AppComponent {
  private service = inject(AppService);

  all$ = this.service.getAll$;
}
