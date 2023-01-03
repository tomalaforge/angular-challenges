import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { AppActions } from './app.action';
import { ActivitySelectors } from './store/activity/activity.selectors';
import { StatusSelectors } from './store/status/status.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    <section>
      <div class="card" *ngFor="let activity of activities$ | async">
        <h2>Activity Name: {{ activity.name }}</h2>
        <p>Main teacher: {{ activity.mainTeacher.name }}</p>
        <span>All teachers available for : {{ activity.type }} are</span>
        <ul>
          <li *ngFor="let teacher of activity.availableTeachers">
            {{ teacher.name }}
          </li>
        </ul>
      </div>
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
export class AppComponent implements OnInit {
  private store = inject(Store);

  private selectActivities = createSelector(
    ActivitySelectors.selectActivities,
    StatusSelectors.selectStatuses,
    (activities, statuses) =>
      activities.map(({ name, teacher, type }) => ({
        name,
        mainTeacher: teacher,
        type,
        availableTeachers:
          statuses.find((s) => s.name === type)?.teachers ?? [],
      }))
  );

  activities$ = this.store.select(this.selectActivities);

  ngOnInit(): void {
    this.store.dispatch(AppActions.initApp());
  }
}
