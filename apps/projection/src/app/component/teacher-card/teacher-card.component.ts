import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    [addOneStore]="store.addOne.bind(store)"
    [removeStore]="store.deleteOne.bind(store)"
    [addRandom]="addRandom"
    label="firstname"
    customClass="bg-light-red"></app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-red > .imgHolder {
        content: url('./../../../assets/img/teacher.png');
      }
    `,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  http: FakeHttpService = inject(FakeHttpService);
  store: TeacherStore = inject(TeacherStore);
  addRandom: () => Teacher = randTeacher;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
}
