import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
})
export class TeacherCardComponent {
  public teachers = this.store.teachers;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {
    this.http.fetchTeachers$.pipe(tap((s) => this.store.addAll(s))).subscribe();
  }

  public addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
