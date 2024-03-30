import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemDirective } from '../../ui/list-item/list-item-directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (add)="addTeacher()" class="bg-light-red">
      <img src="/assets/img/teacher.png" width="200px" alt="teacher" />
      <ng-template listItemRef let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: lemonchiffon;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private _http = inject(FakeHttpService);
  private _store = inject(TeacherStore);
  teachers = this._store.teachers;

  ngOnInit(): void {
    this._http.fetchTeachers$.subscribe((t) => this._store.addAll(t));
  }

  addTeacher(): void {
    this._store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this._store.deleteOne(id);
  }
}
