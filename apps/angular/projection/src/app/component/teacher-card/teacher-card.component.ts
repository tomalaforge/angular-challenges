import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { ListItemTemplateDirective } from '../../directive/list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="(store.teachers$ | async) ?? []"
      class="bg-light-red"
      (addItem)="addItem()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.firstname"
          (deleteItem)="deleteItem(item.id)">
        </app-list-item>
      </ng-template>
    </app-card>
  `,
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
    ListItemComponent,
    ListItemTemplateDirective,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  constructor(
    private readonly http: FakeHttpService,
    public readonly store: TeacherStore
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
