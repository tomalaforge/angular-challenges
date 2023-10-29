import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemTemplateDirective } from '../../directives/list-item-template/list-item-template.directive';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    customClass="bg-light-red"
    (addButtonClicked)="handleAdd()"
    (deleteButtonClicked)="handleDelete($event)">
    <img role="card-image" src="assets/img/teacher.png" width="200px" />

    <ng-template list-option-tmp let-item="item">
      {{ item.firstname }}
      <button (click)="handleDelete(item.id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --bg-light-red: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemTemplateDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  handleAdd(): void {
    this.store.addOne(randTeacher());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
