import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      (deleteBtnClicked)="deleteTeacher($event)"
      customClass="bg-light-red">
      <img headerImg src="assets/img/teacher.png" width="200px" />
      <button
        addNewItem
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
      <ng-template #specialTemplateRef let-item>
        <app-list-item (deleteItemClicked)="deleteTeacher(item.id)">
          {{ item.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --bg-light-red: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
  addNewItem(): void {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
