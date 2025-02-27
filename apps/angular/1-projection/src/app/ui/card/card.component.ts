import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" [class]="customClass()">
      <!-- Header projection -->
      <div class="card-header">
        <ng-content select="[cardHeader]"></ng-content>
      </div>

      <!-- List section -->
      <section class="card-content">
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <!-- Footer projection -->
      <div class="card-footer">
        <ng-content select="[cardFooter]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        @apply w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 shadow-md;
        @apply bg-white transition-all duration-200 hover:shadow-lg;
      }
      .card-header {
        @apply bg-gray-50 p-4;
      }
      .card-content {
        @apply max-h-[300px] space-y-2 overflow-y-auto p-4;
      }
      .card-footer {
        @apply border-t border-gray-100 p-4;
      }
    `,
  ],
  imports: [NgTemplateOutlet],
  standalone: true,
})
export class CardComponent {
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);

  readonly list = input.required<any[]>();
  readonly type = input.required<CardType>();
  readonly customClass = input('');

  CardType = CardType;

  @ContentChild('itemTemplate', { static: true })
  itemTemplate!: TemplateRef<any>;

  addNewItem() {
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    }
  }
}
