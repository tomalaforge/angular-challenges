import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input } from '@angular/core';
import { CardActionsDirective } from './card-actions.directive';
import { CardImageDirective } from './card-image.directive';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      @if (imageTemplate) {
        <ng-container *ngTemplateOutlet="imageTemplate.templateRef" />
      }

      <section>
        @for (item of list(); track trackByFn(item)) {
          <ng-container
            *ngTemplateOutlet="
              listItemTemplate?.templateRef;
              context: { $implicit: item }
            " />
        }
      </section>

      @if (actionsTemplate) {
        <ng-container *ngTemplateOutlet="actionsTemplate.templateRef" />
      }
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number | string }> {
  readonly list = input<T[] | null>(null);
  readonly customClass = input('');

  @ContentChild(CardImageDirective) imageTemplate?: CardImageDirective;
  @ContentChild(CardListItemDirective) listItemTemplate?: CardListItemDirective;
  @ContentChild(CardActionsDirective) actionsTemplate?: CardActionsDirective;

  protected trackByFn(item: T): number | string {
    return item.id;
  }
}
