import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
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
  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  override onAddNewItem() {
    this.store.addOne(randTeacher());
  }
}
