import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      *ngIf="studentsItems$ | async as items"
      [list]="items"
      customClass="bg-light-green"
      image="assets/img/student.webp"
      (delete)="onDelete($event)"
      (add)="onAdd()"></app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgIf, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  studentsItems$ = this.store.students$.pipe(
    map((students) =>
      students.map((s) => ({
        name: `${s.firstname} ${s.lastname.toUpperCase()}`,
        id: s.id,
      }))
    )
  );

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAdd() {
    this.store.addOne(randStudent());
  }

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
