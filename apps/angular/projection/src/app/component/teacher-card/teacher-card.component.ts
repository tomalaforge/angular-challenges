import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardItem } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="data$ | async"
      (addNewItem)="onAddNewItem()"
      (deleteItem)="onDeleteItem($event)"
      [backgroundColor]="'rgba(250, 0, 0, 0.1)'">
      <img src="assets/img/teacher.png" style="width: 200px;" image />
    </app-card>
  `,
  providers: [
    {
      provide: DataStoreBase,
      useClass: TeacherStore,
    },
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class TeacherCardComponent
  extends DataCardComponentBase<Teacher>
  implements OnInit
{
  override data$ = this.source$.pipe(
    map((response) =>
      response.map(({ id, firstName }) => new CardItem(id, firstName)),
    ),
  );

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  override onAddNewItem() {
    this.store.addOne(randTeacher());
  }
}
