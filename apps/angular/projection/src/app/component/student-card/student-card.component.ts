import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      (add)="addStudent()"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template #listItem let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  protected students$ = this.store.students$;

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
