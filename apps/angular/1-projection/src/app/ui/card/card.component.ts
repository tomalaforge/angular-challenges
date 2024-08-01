import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">

      <ng-content ></ng-content>

      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="listItem"
          [ngTemplateOutletContext]="{ $implicit: item}"
        >
        </ng-template>
      </ng-container>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() addItem:  EventEmitter<void> = new EventEmitter<void>()
  @Output() deleteItem:  EventEmitter<number> = new EventEmitter<number>()
  @ContentChild('listItem') listItem!: TemplateRef<any>;

  constructor() {}

  addNewItem() {
    this.addItem.emit()
  }
}
