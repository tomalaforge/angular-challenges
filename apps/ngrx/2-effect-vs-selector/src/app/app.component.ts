import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityComponent } from './components/activity/activity.component';
import { selectActivities } from './store/activity/activity.selectors';
import { selectUser } from './store/user/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe, ActivityComponent],
  template: `
    <h1>Activity Board</h1>
    @if (user$ | async; as user) {
      <div>
        <h1>User Info</h1>
        <p>
          Name: {{ user.firstname }} {{ user.lastname }}
          <br />
          IsAdmin: {{ user.isAdmin }}
        </p>
      </div>
    }
    <section>
      @for (activity of activities$ | async; track activity) {
        <app-activity [activity]="activity"></app-activity>
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private store = inject(Store);
  user$ = this.store.select(selectUser);
  activities$ = this.store.select(selectActivities);
}
