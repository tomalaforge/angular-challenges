import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItem } from '../../model/listItem.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="listToSend"
      [type]="cardType"
      [color]="'rgba(250, 0, 0, 0.1)'"></app-card>
  `,
  styles: ``,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;
  listToSend!: ListItem[];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => {
      this.teachers = t;
      this.listToSend = this.teachers.map((t) => {
        return {
          id: t.id,
          name: t.firstname + ' ' + t.lastname,
          type: CardType.TEACHER,
        };
      });
    });
  }
}
