import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardListItemTemplateDirective } from '../../ui/card/card-list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (onAddNewItem)="addNewTeacher()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template appCardListItem let-item="item">
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (onDelete)="deleteTeacher(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardListItemTemplateDirective,
    NgOptimizedImage,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
