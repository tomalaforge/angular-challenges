import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CityStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, CommonModule],
  //providers: [TemplateRef],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() templateView: TemplateRef<any>;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() addEvent = new EventEmitter();

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore
  ) {}
  deleteItem(id: number) {
    this.deleteEvent.emit(id);
  }
  addNewItem() {
    this.addEvent.emit();
  }
}
