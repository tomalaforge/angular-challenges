import { NgClass, NgForOf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  output,
} from '@angular/core';
import { Id } from '../../model/id.model';
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngClass]="customClass()">
      <ng-content select="[image]" />

      <section>
        @for (item of items(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate.templateRef;
              context: { $implicit: item }
            " />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [NgTemplateOutlet, NgForOf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends Id> {
  readonly items = input<T[]>([]);
  readonly customClass = input('');
  readonly addItem = output<void>();
  @ContentChild(CardItemDirective) itemTemplate!: CardItemDirective<T>;
}
