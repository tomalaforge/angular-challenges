import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        <ng-container *ngFor="let item of list()">
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage, CommonModule],
})
export class CardComponent {
  @Output() add = new EventEmitter<void>();

  @ContentChild('rowRef') rowTemplate!: TemplateRef<any>;

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
}
