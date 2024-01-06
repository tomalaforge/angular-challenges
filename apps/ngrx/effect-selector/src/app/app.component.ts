import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityActions } from './store/activity/activity.actions';
import { selectActivities } from './store/activity/activity.reducer';
import { loadStatuses } from './store/status/status.actions';
import { StatusSelectors } from './store/status/status.selectors';
import { UserActions } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    <section>
      <div class="card" *ngFor="let activity of activities$ | async">
        <h2>Activity Name: {{ activity.name }}</h2>
        <p>Main teacher: {{ activity.teacher.name }}</p>
        <span>All teachers available for : {{ activity.type }} are</span>
        <ul>
          <li *ngFor="let teacher of getAllTeachersForActivityType$ | async">
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

  activities$ = this.store.select(selectActivities);

  // need a view model?

  // should just have one action
  // move state up
  // create app actions
  // then the other load actions useless
  ngOnInit(): void {
    this.store.dispatch(ActivityActions.loadActivities());
    this.store.dispatch(UserActions.loadUsers());
    this.store.dispatch(loadStatuses());
  }

  getAllTeachersForActivityType$ = this.store.select(
    StatusSelectors.selectStatuses,
  );
}
