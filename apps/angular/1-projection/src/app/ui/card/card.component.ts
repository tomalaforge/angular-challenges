import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      style="background-color: var(--card-bg, transparent)">
      <ng-content select="[card-header]" />
      <section>
        <ng-container *ngFor="let item of list()">
          <ng-template
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        </ng-container>
      </section>
      <div>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="add.emit()">
          Add
        </button>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent<T> {
  readonly list = input<T[] | null>(null);
  readonly add = output<void>();
  @ContentChild('itemRef') itemTemplate!: TemplateRef<any>;
}
