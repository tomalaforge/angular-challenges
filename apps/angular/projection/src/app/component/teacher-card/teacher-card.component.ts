import { Component, OnInit } from '@angular/core';
import { FakeHttpService, randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
  <app-card [list]="teachers"
            [type]="cardType"
            customClass="bg-light-red">
    <img alt="teacher"
         cardImage
         src="assets/img/teacher.png"
         width="200px" />
    <button addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
           (click)="addNewItem()">
           Add
    </button>
  </app-card>
  `,

  styles: [
    ` ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) { }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}
