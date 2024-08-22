import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Activity, Person } from '../../store/activity/activity.model';
import { selectStatuses } from '../../store/status/status.selectors';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./activity.component.html`,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      border: solid;
      border-width: 1px;
      border-color: black;
      padding: 2px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  private store = inject(Store);
  teachers$!: Observable<Person[]>;
  ngOnInit() {
    this.teachers$ = this.store.select(selectStatuses).pipe(
      map((stat) => {
        return (
          stat.find((stat) => stat.name === this.activity.type)?.teachers ?? []
        );
      }),
    );
  }
}
