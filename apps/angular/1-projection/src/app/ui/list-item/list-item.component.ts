import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-container
        *ngTemplateOutlet="
          itemTemplate();
          context: { $implicit: item() }
        "></ng-container>
      <!--      {{ name() }}-->
      <!--      <button (click)="delete(id())">-->
      <!--        <img class="h-5" src="assets/svg/trash.svg" />-->
      <!--      </button>-->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);

  readonly item = input.required<any>();
  readonly itemTemplate = input.required<TemplateRef<any>>();
  // itemDeleted=output<any>();
  // readonly type = input.required<CardType>();
  //  itemDeleted=output<number>();

  // delete(id: number) {
  //   // const type = this.type();
  //   // if (type === CardType.TEACHER) {
  //   //   this.teacherStore.deleteOne(id);
  //   // } else if (type === CardType.STUDENT) {
  //   //   this.studentStore.deleteOne(id);
  //   // }
  //   this.itemDeleted.emit(id)
  // }
}
