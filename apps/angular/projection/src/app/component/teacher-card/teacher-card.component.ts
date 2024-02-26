import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { ListItemDirective } from '../../ui/list-item-directive/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers()"
    [type]="cardType"
    customClass="bg-light-red">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template listItem let-rowItem>
      <app-list-item [id]="rowItem.id" [type]="cardType">{{
        rowItem.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers: WritableSignal<Teacher[]> = this.store.teachers;
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
