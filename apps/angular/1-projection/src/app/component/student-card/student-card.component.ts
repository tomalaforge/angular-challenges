import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  standalone: true,
  template: `
    <app-card
      [list]="students()"
      (newItem)="addStudent()"
      (deleteItem)="deleteStudent($event)"
      customClass="bg-light-green">
      <img
        ngProjectAs="img"
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="student" />

      <ng-template let-item="item">
        {{ item.firstName }}
        <button (click)="deleteStudent(item.id)">
          <img
            class="h-5"
            ngSrc="assets/svg/trash.svg"
            width="200"
            height="200"
            alt="trash" />
        </button>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

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
