import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from './../../ui/list-item/list-item.component';
@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;
  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  addItem() {
    this.store.addOne(randTeacher());
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
