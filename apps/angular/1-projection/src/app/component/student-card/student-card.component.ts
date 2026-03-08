import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardAction,
  CardActionType,
  CardComponent,
} from '../../ui/card/card.component';
import { CardListItemTemplateDirective } from '../../ui/list-item/list-item-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (actions)="cardActions($event)">
      <img ngSrc="assets/img/student.webp" width="200" height="200" alt="" />

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
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  cardActions(action: CardAction) {
    switch (action.type) {
      case CardActionType.ADD:
        this.store.addOne(randStudent());
        break;
      case CardActionType.DELETE:
        this.store.deleteOne(action.payload.id);
        break;
      default:
        console.log('Unknown');
    }
  }
}
