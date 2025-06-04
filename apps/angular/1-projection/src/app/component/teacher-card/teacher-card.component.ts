import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataAccessStore } from '../../data-access/_lib/base-service-data-access-store';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardHeaderDirective } from '../../ui/card/card-header.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemActionsDirective } from '../../ui/list-item/list-item-actions.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { BaseCardComponent } from '../_lib/base-card.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="items()" [itemTpl]="itemTpl" customClass="bg-light-red">
      <img
        appCardHeader
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="Teacher Icon" />

      <ng-template #itemTpl let-teacher>
        <app-list-item>
          {{ teacher.firstName }}
          <button
            appListItemActions
            (click)="removeItem(teacher.id)"
            class="h-5 w-5">
            <img src="assets/svg/trash.svg" alt="Delete Teacher" />
          </button>
        </app-list-item>
      </ng-template>

      <button
        appCardActions
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add Teacher
      </button>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardHeaderDirective,
    CardActionsDirective,
    ListItemActionsDirective,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: BaseDataAccessStore,
      useClass: TeacherStore,
    },
  ],
  standalone: true,
})
export class TeacherCardComponent extends BaseCardComponent<Teacher> {
  override randMethod = () => randTeacher();
  override httpItems$: Observable<Teacher[]> = this.http.fetchTeachers$;
}
