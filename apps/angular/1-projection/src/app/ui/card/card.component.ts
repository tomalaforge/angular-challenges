// card.component.ts

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
} from '@angular/core';
// import { randStudent, randTeacher } from '../../data-access/fake-http.service';
// import { StudentStore } from '../../data-access/student.store';
// import { TeacherStore } from '../../data-access/teacher.store';
// import { CardType } from '../../model/card.model';
// import { ListItemComponent } from '../list-item/list-item.component';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <!-- 1. Multi-slot projection for image -->
      <ng-content select="img" />

      <!-- 2. @for loop remains here, rendering projected row template -->
      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="rowTemplate()?.templateRef ?? null"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <!-- 3. Multi-slot projection for add button -->
      <ng-content select="button" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CardComponent<T extends { id: number }> {
  readonly list = input<T[] | null>(null);
  readonly customClass = input('');

  // Bonus: Query row template via Directive instead of magic string
  readonly rowTemplate = contentChild(CardRowDirective<T>);
}
