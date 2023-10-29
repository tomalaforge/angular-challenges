import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListItemTemplateDirective } from '../../directives/list-item-template/list-item-template.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ListItemComponent,
    CommonModule,
    ListItemTemplateDirective,
  ],
  styles: [
    `
      .bg-light-red {
        background-color: var(--bg-light-red);
      }
      .bg-light-green {
        background-color: var(--bg-light-green);
      }
      .bg-light-blue {
        background-color: var(--bg-light-blue);
      }
    `,
  ],
})
export class CardComponent {
  @Input() list: unknown[] | null = null;
  @Input() customClass = '';
  @Output() addButtonClicked = new EventEmitter<void>();
  @Output() deleteButtonClicked = new EventEmitter<number>();
  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  optionTemplate: TemplateRef<unknown> | null = null;

  addNewItem(): void {
    this.addButtonClicked.emit();
  }

  emitDelete(id: number): void {
    this.deleteButtonClicked.emit(id);
  }
}
