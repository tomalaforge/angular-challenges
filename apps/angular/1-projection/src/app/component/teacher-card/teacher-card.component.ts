import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardAction,
  CardActionType,
  CardComponent,
} from '../../ui/card/card.component';
import { CardListItemTemplateDirective } from '../../ui/list-item/list-item-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (actions)="cardActions($event)">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />

      <ng-template cardListItem let-item let-onDeleteAction="onDeleteAction">
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (deleteEvent)="onDeleteAction(item.id)" />
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
  encapsulation: ViewEncapsulation.None,
  imports: [
    CardComponent,
    CardListItemTemplateDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  cardActions(action: CardAction) {
    switch (action.type) {
      case CardActionType.ADD:
        this.store.addOne(randTeacher());
        break;
      case CardActionType.DELETE:
        this.store.deleteOne(action.payload.id);
        break;
      default:
        console.log('Unhandled action: ' + action);
    }
  }
}
