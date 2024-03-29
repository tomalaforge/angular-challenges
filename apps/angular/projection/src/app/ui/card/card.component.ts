import { CommonModule } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ListItemDirective } from '../list-item/list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.backgroundColor]="bgColor()">
      <ng-content select="img" />

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="listItem()"
            [ngTemplateOutletContext]="{ item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  public list = input<T[]>([]);
  public bgColor = input<string>('white');

  public add = output<void>();

  public listItem = contentChild.required(ListItemDirective<T>, {
    read: TemplateRef<{ item: T }>,
  });
}
