import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      img="assets/img/teacher.png"
      customClass="bg-light-red"
      (addNewItem)="addItem()"
      (deleteItem)="deleteItem($event)"></app-card>
  `,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;

  addItem() {
    this.store.addOne(randTeacher());
  }
  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
