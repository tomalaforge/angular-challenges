import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { TeacherStore } from '../../data-access/teacher.store';
import { StudentStore } from '../../data-access/student.store';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="image-url"></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.name ?? item.firstName"
            [id]="item.id"
            [store]="content()"></app-list-item>
        }
      </section>
      <ng-content select="add-button"></ng-content>
    </div>
  `,
  styles:[
    `
    .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ListItemComponent],
})
export class CardComponent {

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly content = input.required<TeacherStore | StudentStore | CityStore>();

}
