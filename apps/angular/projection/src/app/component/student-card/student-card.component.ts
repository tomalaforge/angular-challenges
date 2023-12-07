import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { ListItem } from '../../model/listItem.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="listToSend"
      [type]="cardType"
      [color]="'rgba(0, 250, 0, 0.1)'"></app-card>
  `,
  standalone: true,
  styles: ``,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  listToSend!: ListItem[];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => {
      this.students = s;
      this.listToSend = this.students.map((s) => {
        return {
          id: s.id,
          name: s.firstname + ' ' + s.lastname,
          type: CardType.STUDENT,
        };
      });
    });
  }
}
