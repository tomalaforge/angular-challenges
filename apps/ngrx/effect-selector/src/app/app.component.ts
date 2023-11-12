import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityCardComponent } from './components/activity-card.component';
import { loadActivities } from './store/activity/activity.actions';
import { selectActivities } from './store/activity/activity.selectors';
import { loadUsers } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe, ActivityCardComponent],
  template: `
    <h1>Activity Board</h1>
    <section>
      <app-activity-card
        *ngFor="let activity of activities$ | async"
        [activity]="activity"></app-activity-card>
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
export class AppComponent implements OnInit {
  private store = inject(Store);

  activities$ = this.store.select(selectActivities);

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
    this.store.dispatch(loadUsers());
  }
}
