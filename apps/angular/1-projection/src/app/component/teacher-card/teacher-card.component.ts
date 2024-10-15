import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardModule } from '../../ui/card/card.module';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" class="bg-light-red" (addItem)="addItem()">
      <img src="assets/img/teacher.png" width="200" />
      <ng-template [cardItem]="teachers()" let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteItem)="deleteItem(item.id)" />
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
  imports: [CardModule, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Signal<Teacher[]> = toSignal(this.store.teachers$, {
    initialValue: [],
  });
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItem(): void {
    this.store.addOne(randTeacher());
  }

  deleteItem(index: number): void {
    this.store.deleteOne(index);
  }
}
