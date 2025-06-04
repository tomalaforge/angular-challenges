import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDataAccessStore } from '../../data-access/_lib/base-service-data-access-store';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardActionsDirective } from '../../ui/card/card-actions.directive';
import { CardHeaderDirective } from '../../ui/card/card-header.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemActionsDirective } from '../../ui/list-item/list-item-actions.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { BaseCardComponent } from '../_lib/base-card.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="items()" [itemTpl]="itemTpl" customClass="bg-light-blue">
      <img
        appCardHeader
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="Student Icon" />

      <ng-template #itemTpl let-student>
        <app-list-item>
          {{ student.firstName }}
          <button
            appListItemActions
            (click)="removeItem(student.id)"
            class="h-5 w-5">
            <img src="assets/svg/trash.svg" alt="Delete Student" />
          </button>
        </app-list-item>
      </ng-template>

      <button
        appCardActions
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add Student
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
      useClass: StudentStore,
    },
  ],
  standalone: true,
})
export class StudentCardComponent extends BaseCardComponent<Student> {
  override randMethod = () => randStudent();
  override httpItems$ = this.http.fetchStudents$;
}
