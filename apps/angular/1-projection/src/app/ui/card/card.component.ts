import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item) {
          <app-list-item>
            <ng-container
              *ngTemplateOutlet="templateRef; context: { item: item }" />
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="newItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly newItem = output();
  readonly deleteItem = output<number>();
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
}
