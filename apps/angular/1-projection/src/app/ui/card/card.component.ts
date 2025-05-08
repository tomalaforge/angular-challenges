import {
  Component,
  inject,
  Injector,
  input,
  OnInit,
  output,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item
            (deleteItem)="onDeleteItem($event)"
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent implements OnInit {
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);
  private injector = inject(Injector);

  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');

  CardType = CardType;

  onAddNewItem() {
    this.addNewItem.emit();
  }

  onDeleteItem(id: number) {
    console.log('id', id);
    // Comment invoquer le store de chaque card sans faire de boucle ?
    // Je passe le StudentStore en input mais n'arrive pas à l'invoquer
  }

  ngOnInit(): void {
    console.log('onInit');
  }

  readonly store = input();

  addNewItem = output();
}
