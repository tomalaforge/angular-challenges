import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <ng-template cardImage>
        <img
          ngSrc="assets/img/student.webp"
          width="200"
          height="200"
          alt="Student" />
      </ng-template>

      <ng-template cardListItem let-student>
        <app-list-item (onDelete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>

      <ng-template cardActions>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addStudent()">
          Add Student
        </button>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    CardImageDirective,
    CardListItemDirective,
    CardActionsDirective,
  ],
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
