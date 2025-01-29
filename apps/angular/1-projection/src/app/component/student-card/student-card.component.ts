import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      class="bg-light-green"
      [items]="students()"
      (addNewItem)="onNewItemAdded()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [cardRow]="students()" let-student>
        <app-list-item (delete)="onDelete(student.id)">
          <div>{{ student.firstName }}</div>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardRowDirective,
    ListItemComponent,
  ],
  providers: [StudentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private store = inject(StudentStore);

  students = this.store.students;

  onNewItemAdded() {
    this.store.addOne();
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
