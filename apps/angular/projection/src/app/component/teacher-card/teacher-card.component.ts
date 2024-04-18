import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="$data()"
      (addNewItem)="onAddNewItem()"
      style="background-color: rgba(250, 0, 0, 0.1);">
      <img src="assets/img/teacher.png" style="width: 200px;" cover />

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
      useClass: TeacherStore,
    },
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
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
