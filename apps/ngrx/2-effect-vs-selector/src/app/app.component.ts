import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ActivityStatusSelector } from './store/activity/activity-status.selector';
import { EnhancedActivity } from './store/activity/activity.model';
import { AppActions } from './store/app/app.actions';
import { TeacherCardComponent } from './teacher-card.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Activity Board</h1>
    <section>
      @for (activity of activities(); track activity.name) {
        <app-teacher-card [activity]="activity" />
      }
    </section>
  `,
  styles: `
    section {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 2px;
    }
  `,
  standalone: true,
  imports: [TeacherCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _store = inject(Store);

  activities: Signal<EnhancedActivity[]> = toSignal(
    this._store.select(ActivityStatusSelector.selectActivitiesWithStatuses),
  ) as Signal<EnhancedActivity[]>;

  ngOnInit(): void {
    this._store.dispatch(AppActions.initApp());
  }
}
