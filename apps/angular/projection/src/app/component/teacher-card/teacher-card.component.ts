import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [type]="cardType"
      customClass="bg-red-200/50"
      showingProp="firstName">
      <img src="assets/img/teacher.png" alt="" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
  providers: [{ provide: Store, useExisting: TeacherStore }],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.items$.subscribe((t: Teacher[]) => (this.teachers = t));
  }
}
