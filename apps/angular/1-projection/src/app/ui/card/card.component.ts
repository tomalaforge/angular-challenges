import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
//import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() listItemTemplate!: TemplateRef<any>;
  @Output() addItem = new EventEmitter();
  CardType = CardType;

  addItemEmit() {
    this.addItem.emit();
  }
}
