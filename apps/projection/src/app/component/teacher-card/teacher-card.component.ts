import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemTemplateDirective } from '../../directives/list-item-template.directive';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    imageUrl="assets/img/teacher.png"
    (addNewItem)="onAddNewItem()"
    (deleteItem)="onDeleteItem($event)">
    <ng-template [appListItemTemplate] let-item>
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --card-background-color: rgba(250, 0, 0, 0.1);
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

  onAddNewItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
