import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent, CommonModule],
})
export class CardComponent {
  @Input() list!: Array<Teacher | City | Student>;
  @Input() customClass = '';
  @Input('optionTemplate')
  optionTemplateRef!: TemplateRef<any>;
  @Output() addItem: EventEmitter<boolean> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();

  constructor() {}

  addNewItem() {
    this.addItem.emit(true);
  }
  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
