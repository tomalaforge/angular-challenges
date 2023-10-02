import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { randStudent } from '../../data-access/fake-http.service';
@Component({
  selector: 'app-student-card',
  template: ` <ng-template #student>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-template>
    <app-card
      [list]="students"
      [type]="cardType"
      [templateView]="student"
      (deleteEvent)="deleteItem($event)"
      (addEvent)="addItem()"
      customClass="bg-light-green"></app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => {
      console.log(s);
      this.store.addAll(s);
    });

    this.store.students$.subscribe((s) => (this.students = s));
  }
  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
  addItem() {
    this.store.addOne(randStudent());
  }
}
