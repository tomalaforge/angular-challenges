import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardDirective } from '../directive/card.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, CardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  template: `
    <ng-content select="img" />
    <section>
      <ng-container *ngFor="let item of list">
        <ng-container
          [ngTemplateOutlet]="templateRef"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      </ng-container>
    </section>
    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem()">
      Add
    </button>
  `,
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() add: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild(CardDirective, { read: TemplateRef })
  templateRef!: TemplateRef<{ $implicit: T }>;

  public addNewItem(): void {
    this.add.emit();
  }
}
