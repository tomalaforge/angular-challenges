import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
//import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { Observable } from 'rxjs';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, ListItemComponent, AsyncPipe],
})
export class CardComponent {
  @Input() list!: Observable<any[]>;
  @Input() customClass = '';
  @Input() listItemTemplate!: TemplateRef<any>;
  @Output() addItem = new EventEmitter();
  CardType = CardType;

  addItemEmit() {
    this.addItem.emit();
  }
}
