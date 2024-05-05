import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      customClass="bg-light-green"
      (addItem)="addItem()">
      <img img-holder src="assets/img/student.webp" width="200px" />
      <ng-template #card let-item>
        <app-list-item
          [name]="item.firstName"
          (deleteItem)="delete($event)"
          [id]="item.id"></app-list-item>
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
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addItem() {
    this.store.addOne(randStudent());
  }
}
