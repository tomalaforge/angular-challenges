import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-template #templateTest>
      {{ name }}
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>

    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-container *ngTemplateOutlet="templateTest"></ng-container>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class ListItemComponent implements OnChanges {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.id, this.name, this, this.type);
  }

  delete(id: number) {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    }
  }
}
