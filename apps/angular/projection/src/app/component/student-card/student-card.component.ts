import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [itemNameTemplate]="itemNameTemplate"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-green">
      <img cardImage src="assets/img/student.webp" width="200px" />
      <button
        addButton
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
    <ng-template #itemNameTemplate let-name="firstname">{{ name }}</ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students = signal<Student[]>([]);

  constructor(private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.students.set(s));
  }

  addNewItem() {
    this.students.update((val) => [...val, randStudent()]);
  }

  deleteItem(id: number) {
    this.students.update((val) => val.filter((t) => t.id !== id));
  }
}
