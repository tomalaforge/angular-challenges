import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemTemplateDirective } from '../../list-item-template.directive';
import { CardItem } from '../../model/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[img]"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <ng-container
            *ngTemplateOutlet="
              template;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="this.add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  styles: [
    `
      :host {
        display: inline-block;
      }
      :host(.bg-light-red) {
        background-color: rgba(250, 0, 0, 0.1);
      }
      :host(.bg-light-green) {
        background-color: rgba(0, 250, 0, 0.1);
      }
      :host(.bg-light-blue) {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list: CardItem[] | null = null;
  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  template!: TemplateRef<{ $implicit: CardItem }>;
  @Output() add: EventEmitter<void> = new EventEmitter<void>();
}
