// student-card.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service'; // Fix 2: Imported randStudent
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive'; // Added missing import
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component'; // Added missing import

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <!-- Fix 1: Removed the trailing '/' so it is no longer self-closing -->

      <!-- 1. Project image -->
      <img
        src="assets/img/student.webp"
        width="200"
        height="200"
        alt="student" />

      <!-- 2. Project list item template -->
      <ng-template cardRow let-student>
        <app-list-item (deleted)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>

      <!-- 3. Project Add button -->
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addStudent()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective], // Added missing components/directives to imports
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  readonly students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
