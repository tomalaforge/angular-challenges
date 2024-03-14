import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="rgba(0, 250, 0, 0.1)">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template #deleteButton let-id let-firstName="firstName">
        {{ firstName }}
        <button (click)="deleteStudent(id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addStudent()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet],
})
export class StudentCardComponent implements OnInit {
  students: WritableSignal<Student[]> = signal([]);

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => this.students.set(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
