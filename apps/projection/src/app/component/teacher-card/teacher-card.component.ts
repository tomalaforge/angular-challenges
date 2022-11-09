import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [items]="teacherItems$ | async"
    customClass="bg-light-red"
    (addNewItem)="addNewTeacher()">
    <ng-container image>
      <img src="assets/img/teacher.png" width="200px" />
    </ng-container>
    <ng-template #listItemRef let-item>
      <app-list-item (deleteItem)="deleteTeacher(item.id)">
        {{ item?.name }} (T)
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  teacherItems$: Observable<Item[]> = this.store.teachers$.pipe(
    map((teachers) =>
      teachers.map(
        (t) => ({ name: `${t.lastname} ${t.firstname}`, id: t.id } as Item)
      )
    )
  );

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
