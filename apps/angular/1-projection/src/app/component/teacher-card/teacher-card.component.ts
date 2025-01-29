import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      (addNewItem)="onNewItemAdded()"
      [items]="teachers()"
      class="bg-light-red">
      <img ngSrc="assets/img/teacher.png" priority width="200" height="200" />

      <ng-template [cardRow]="teachers()" let-teacher>
        <app-list-item (delete)="onDelete(teacher.id)">
          <div>{{ teacher.firstName }}</div>
        </app-list-item>
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
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardRowDirective,
    ListItemComponent,
  ],
  providers: [TeacherStore],
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);
  protected readonly teachers = this.store.teachers;

  onNewItemAdded() {
    this.store.addOne();
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
