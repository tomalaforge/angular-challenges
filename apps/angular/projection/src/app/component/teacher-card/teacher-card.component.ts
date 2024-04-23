import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      customClass="bg-light-red"
      (addNewItem)="store.addOne(randTeacher())"
      (itemDelete)="store.deleteOne($event)">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,

  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  randTeacher = randTeacher;

  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
}
