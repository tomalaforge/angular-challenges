import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
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

      :host-context(.teacher-theme) .bg-light-red {
        background-color: var(--bg-light-red);
      }
    `,
  ],
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: unknown[] | null = null;
  @Input() customClass = '';
  @Input() specialTemplate!: TemplateRef<unknown>;
  @Output() deleteBtnClicked = new EventEmitter<number>();

  CardType = CardType;

  public deleteItem(itemId: number): void {
    this.deleteBtnClicked.emit(itemId);
  }
}
