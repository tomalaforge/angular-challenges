import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityType, Person } from './store/activity/activity.model';
import { selectActivities } from './store/activity/activity.selectors';
import { selectAllTeachersByActivityType } from './store/status/status.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>Activity Board</h1>
    <section>
      @for (activity of activities(); track activity.id) {
        <div class="card">
          <h2>Activity Name: {{ activity.name }}</h2>
          <p>Main teacher: {{ activity.teacher.name }}</p>
          <span>All teachers available for : {{ activity.type }} are</span>
          <ul>
            @for (
              teacher of getAllTeachersForActivityType(activity.type)();
              track teacher.id
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
        border: 1px solid black;
        padding: 2px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private store = inject(Store);

  activities = this.store.selectSignal(selectActivities);

  getAllTeachersForActivityType(type: ActivityType): Signal<Person[]> {
    return this.store.selectSignal(selectAllTeachersByActivityType(type));
  }
}
