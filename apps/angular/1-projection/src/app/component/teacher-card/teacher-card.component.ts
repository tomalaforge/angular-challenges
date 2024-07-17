import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [items]="teachers()" (addItem)="onAddItem()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #rowRef let-teacher>
        <app-list-item (onDelete)="onDelete(teacher.id)">
          <span>{{ teacher.firstName }}</span>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit, OnDestroy {
  private _http = inject(FakeHttpService);
  private _destroyed$ = new Subject<void>();
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this._http.fetchTeachers$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((t) => this.store.addAll(t));
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onAddItem() {
    this.store.addOne(randTeacher());
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
