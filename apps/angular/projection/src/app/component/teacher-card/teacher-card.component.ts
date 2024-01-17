import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
    <app-card
      [list]="teachers$ | async"
      (add)="addTeacher()"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #listItem let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private store = inject(TeacherStore);
  private http = inject(FakeHttpService);

  protected teachers$ = this.store.teachers$;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  addTeacher() {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
