import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentStore, randStudent } from '../../data-access';
import { Student } from '../../model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent, ListItemComponent } from '../../ui';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="$data()"
      (addNewItem)="onAddNewItem()"
      style="background-color: rgba(0, 250, 0, 0.1);">
      <img src="assets/img/student.webp" style="width: 200px;" cover />

      <ng-template #cardRow let-item>
        <app-list-item [name]="item.firstName">
          <button (click)="onDeleteItem(item.id)" delete>
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  providers: [
    {
      provide: DataStoreBase,
      useClass: StudentStore,
    },
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
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
