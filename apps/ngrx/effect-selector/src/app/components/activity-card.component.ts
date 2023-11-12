import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Activity, ActivityType } from '../store/activity/activity.model';
import { selectAllTeachersByActivityType } from '../store/status/status.selectors';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: ` <h2>Activity Name: {{ activity.name }}</h2>
    <p>Main teacher: {{ activity.teacher.name }}</p>
    <span>All teachers available for : {{ activity.type }} are</span>
    <ul>
      <li
        *ngFor="
          let teacher of getAllTeachersForActivityType$(activity.type) | async
        ">
        {{ teacher.name }}
      </li>
    </ul>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        border: solid;
        border-width: 1px;
        border-color: black;
        padding: 2px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityCardComponent {
  @Input() activity!: Activity;

  private store = inject(Store);

  getAllTeachersForActivityType$ = (type: ActivityType) =>
    this.store.select(selectAllTeachersByActivityType(type));
}
