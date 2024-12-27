import { Component, inject, OnInit, Signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [customClass]="'rgba(250, 0, 0, 0.1)'"
      [templateRef]="teacher"
      (add)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>

    <ng-template #teacher let-teacher>
      <app-list-item
        [name]="teacher.firstName"
        [id]="teacher.id"
        (delete)="deleteTeacher(teacher.id)" />
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: TeacherStore = inject(TeacherStore);

  teachers: Signal<Teacher[]> = this.store.elements$;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(teacherId: number) {
    this.store.deleteOne(teacherId);
  }
}
