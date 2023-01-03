import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { initStore } from './store/app.actions';
import { selectActivitiesWithTeachers } from './store/activity/activity.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    <section>
      <div
        class="card"
        *ngFor="let activity of activitiesWithTeachers$ | async">
        <h2>Activity Name: {{ activity.name }}</h2>
        <p>Main teacher: {{ activity.teacher.name }}</p>
        <span>All teachers available for : {{ activity.type }} are</span>
        <ul>
          <li *ngFor="let teacher of activity.teachers">
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

  activitiesWithTeachers$ = this.store.select(selectActivitiesWithTeachers);

  ngOnInit(): void {
    this.store.dispatch(initStore());
  }
}
