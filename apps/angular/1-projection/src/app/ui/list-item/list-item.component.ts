import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="deleteItem()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Output() delete = new EventEmitter<number>();

  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);

  readonly id = input.required<number>();
  readonly name = input.required<string>();
  // readonly type = input.required<CardType>();

  deleteItem() {
    this.delete.emit(this.id());
    /*const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    }*/
  }
}
