import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { randStudent } from '../../data-access/fake-http.service';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [list]="students"
    [type]="cardType"
    (addEvent)="addItem()"
    customClass="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template #listView let-item>
      <app-list-item (deleteEvent)="deleteItem(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template></app-card
  >`,
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
