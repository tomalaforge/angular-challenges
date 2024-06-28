import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityType } from './store/activity/activity.model';
import {
  selectActivities,
  selectAllTeachersByActivityType,
} from './store/activity/activity.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    <section>
      @for (activity of activities$ | async; track activity.id) {
        <div class="card">
          <h2>Activity Name: {{ activity.name }}</h2>
          <p>Main teacher: {{ activity.teacher.name }}</p>
          <span>All teachers available for : {{ activity.type }} are</span>
          <ul>
            @for (
              teacher of getAllTeachersForActivityType$(activity.type) | async;
              track $index
            ) {
              <li>{{ teacher.name }}</li>
            }
          </ul>
        </div>
      }
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 2px;
      }

      .card {
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
export class AppComponent {
  private store = inject(Store);

  activities$ = this.store.select(selectActivities);

  getAllTeachersForActivityType$ = (type: ActivityType) =>
    this.store.select(selectAllTeachersByActivityType(type));
}
