import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { templateRefDirective } from '../../directives/tempateRef.directive';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (addItem)="addTeacher()" class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template templateRef let-teacher>
        <app-list-item
          [id]="teacher.id"
          (deleteItem)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
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
  imports: [CardComponent, ListItemComponent, templateRefDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers = signal<Teacher[]>([]);

  http = inject(FakeHttpService);
  storeTeachers = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.storeTeachers.addAll(t));

    this.storeTeachers.teachers$.subscribe((teachers) =>
      this.teachers.set(teachers),
    );
  }

  addTeacher() {
    this.storeTeachers.addOne(randTeacher());
  }

  deleteTeacher(teacherId: number) {
    this.storeTeachers.deleteOne(teacherId);
  }
}
