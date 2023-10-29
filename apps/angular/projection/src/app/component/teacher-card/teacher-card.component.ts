import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { ListItemTemplateDirective } from '../../directives/list-item-template/list-item-template.directive';
import { CardListInterface } from '../../interfaces/card-list.interface';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
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
  imports: [CardComponent, ListItemTemplateDirective, CommonModule],
})
export class TeacherCardComponent implements OnInit, CardListInterface {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  handleAdd(): void {
    this.store.addOne(randTeacher());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
