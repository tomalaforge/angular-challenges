import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';
import { City } from '../../model/city.model';

@Directive({ selector: 'ng-template[card-list]', standalone: true })
export class CardListDirective {}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, NgClass],
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }

      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
})
export class CardComponent<T> {
  @Input() isTeacher = false;
  @Input() isStudent = false;

  @ContentChild(CardListDirective, { read: TemplateRef })
  cardList!: TemplateRef<{ $implicit: T }>;

  @Input() list: T[] | null = null;
  @Input() type!: CardType;

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    }
  }
}
