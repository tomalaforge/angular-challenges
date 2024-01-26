import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from './app.actions';
import { AppStore } from './app.config';
import { ActivitySelectors } from './store/activity/activity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly #store: Store<AppStore> = inject(Store<AppStore>);

  activities = this.#store.selectSignal(
    ActivitySelectors.selectActivitiesWithTeachers,
  );

  ngOnInit(): void {
    this.#store.dispatch(AppActions.initApp());
  }
}
