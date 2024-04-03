import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>
      <section>
        <ng-container *ngFor="let item of list">
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  styles: [
    `
      :host {
        .bg-light-red {
          background-color: rgba(250, 0, 0, 0.1);
        }
        .bg-light-green {
          background-color: rgba(250, 0, 0, 0.1);
        }
      }
    `,
  ],
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() add = new EventEmitter();

  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  constructor() {}
}
