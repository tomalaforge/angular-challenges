import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardImageTemplateDirective } from '../../directive/card-image-template.directive';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-container
        [ngTemplateOutlet]="
          cardImageTemplate?.templateRef ?? null
        "></ng-container>

      <section>
        <ng-container
          *ngFor="let item of list"
          [ngTemplateOutlet]="listItemTemplate?.templateRef ?? null"
          [ngTemplateOutletContext]="{
            $implicit: item
          }"></ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  @ContentChild(CardImageTemplateDirective)
  cardImageTemplate?: CardImageTemplateDirective;
  @ContentChild(ListItemTemplateDirective)
  listItemTemplate?: ListItemTemplateDirective;

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    }
  }
}
