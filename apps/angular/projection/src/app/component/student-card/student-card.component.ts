import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="data$ | async"
      (addNewItem)="onAddNewItem()"
      (deleteItem)="onDeleteItem($event)"
      [backgroundColor]="'rgba(0, 250, 0, 0.1)'">
      <img src="assets/img/student.webp" style="width: 200px;" image />
    </app-card>
  `,
  providers: [
    {
      provide: DataStoreBase,
      useClass: StudentStore,
    },
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class StudentCardComponent
  extends DataCardComponentBase<Student>
  implements OnInit
{
  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  override onAddNewItem() {
    this.store.addOne(randStudent());
  }
}
