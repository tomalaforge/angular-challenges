import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  TemplateRef,
} from '@angular/core';

import { CardTemplateRefContext } from '../../model/card-template-ref-context.model';
import { EntityWithId } from '../../model/entity-with-id.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="app-card flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[avatar]"></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="listItemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  styles: [
    `
      .app-card {
        background-color: var(--app-card-background, #fff);
      }
    `,
  ],
})
export class CardComponent {
  readonly listItemTemplate: InputSignal<TemplateRef<CardTemplateRefContext>> =
    input.required<TemplateRef<CardTemplateRefContext>>();

  readonly customClass: InputSignal<string> = input<string>('');

  readonly list: InputSignal<EntityWithId[] | null> = input.required<
    EntityWithId[] | null
  >();

  readonly onAddNewItem: OutputEmitterRef<void> = output<void>();
}
