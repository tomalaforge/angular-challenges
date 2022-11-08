import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [items]="studentItems"
    customClass="bg-light-green"
    (_addNewItem)="addNewStudent()"
    (_deleteItem)="deleteStudent($event)">
    <img src="assets/img/student.webp" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  studentItems: Item[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$
      .pipe(
        map((students) =>
          students.map(
            (s) => ({ name: `${s.lastname} ${s.firstname}`, id: s.id } as Item)
          )
        )
      )
      .subscribe((items) => (this.studentItems = items));
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
