import { AsyncPipe } from '@angular/common';
import { Component, OnInit, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
    <app-card
      [list]="students()"
      [customClass]="'bg-light-green'"
      (delete)="delete($event)">
      <img cardImage src="assets/img/student.webp" width="200px" />

      <button
        cardActionButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewStudent()">
        Add
      </button>
      <ng-template #listTemplateRef let-item>
        <p>{{ item.firstName }}</p>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students: Signal<Student[]> = toSignal(this.store.students$, {
    initialValue: [],
  });

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
