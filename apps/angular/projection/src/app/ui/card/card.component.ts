import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';

  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  @ContentChild('rowRef', { read: TemplateRef }) rowTemplate!: TemplateRef<any>;

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onCreate() {
    this.create.emit();
  }
}
