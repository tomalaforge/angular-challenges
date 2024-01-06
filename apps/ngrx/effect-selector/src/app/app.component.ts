import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AppActions } from './app.actions';
import { selectActivities } from './store/activity/activity.reducer';
import { StatusSelectors } from './store/status/status.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    @if (vm$ | async; as vm) {
      <section>
        @for (activity of vm.activities; track activity.id) {
          <div class="card">
            <h2>Activity Name: {{ activity.name }}</h2>
            <p>Main teacher: {{ activity.teacher.name }}</p>
            <span>All teachers available for : {{ activity.type }} are</span>
            <ul>
              @for (teacher of vm.teachers; track teacher.name) {
                <li>{{ teacher.name }}</li>
              }
            </ul>
          </div>
        }
      </section>
    }
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
  getAllTeachersForActivityType$ = this.store.select(
    StatusSelectors.selectStatuses,
  );

  // this could be in another file like app.selector.ts
  #vm = createSelector(
    selectActivities,
    StatusSelectors.selectStatuses,
    (activities, teachers) => ({ activities, teachers }),
  );

  vm$ = this.store.select(this.#vm);

  // view model helps with testing and mocking

  ngOnInit(): void {
    this.store.dispatch(AppActions.initApp());
  }
}
