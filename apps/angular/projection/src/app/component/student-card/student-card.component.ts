import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardItemContentDirective } from '../../ui/card/card-item-content.directive';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [list]="students()"
    class="bg-light-green"
    (addItem)="addNewStudent()">
    <img src="assets/img/student.webp" width="200px" cardImage />
    <ng-template let-student appCardItemContent>
      <app-list-item (deleteItem)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardItemContentDirective],
})
export class StudentCardComponent implements OnInit {
  students = this.store.students;

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

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
