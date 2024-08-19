import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityComponent } from './components/activity/activity.component';
import { selectActivities } from './store/activity/activity.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe, ActivityComponent],
  template: `
    <h1>Activity Board</h1>
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

  activities$ = this.store.select(selectActivities);
}
