import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" [type]="cardType" customClass="student-card">
      <!-- Header Template -->
      <div cardHeader class="header-content">
        <img
          ngSrc="assets/img/student.webp"
          width="200"
          height="200"
          alt="Student"
          class="header-image" />
      </div>

      <!-- Item Template -->
      <ng-template #itemTemplate let-student>
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          [type]="cardType"
          (delete)="deleteStudent(student.id)"></app-list-item>
      </ng-template>

      <!-- Footer Template -->
      <div cardFooter>
        <button class="add-button" (click)="addStudent()">Add Student</button>
      </div>
    </app-card>
  `,
  styles: [
    `
      .student-card {
        @apply bg-gradient-to-br from-green-50 to-white;
      }
      .header-content {
        @apply flex justify-center;
      }
      .header-image {
        @apply rounded-lg object-cover shadow-sm;
      }
      .add-button {
        @apply w-full rounded-md bg-blue-500 px-4 py-2 text-white;
        @apply transition-colors duration-200 hover:bg-blue-600;
        @apply disabled:cursor-not-allowed disabled:opacity-50;
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  standalone: true,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
