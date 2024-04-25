import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardImageTemplateDirective } from '../../directive/card-image-template.directive';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      customClass="bg-light-red"
      (addNewItem)="onAddTeacherItemEvent()">
      <ng-template cardImageTemplate>
        <img src="assets/img/teacher.png" width="200px" />
      </ng-template>

      <ng-template listItemTemplate let-item>
        <app-list-item
          [id]="item.id"
          [name]="getTeacherName(item)"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    CardImageTemplateDirective,
    ListItemComponent,
    ListItemTemplateDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit() {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }

  getTeacherName({ firstName, lastName }: Teacher): string {
    return `${firstName} ${lastName}`;
  }

  onAddTeacherItemEvent() {
    this.store.addOne(randTeacher());
  }
}
