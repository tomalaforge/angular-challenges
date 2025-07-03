import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="img()" width="200" height="200" />

      <section>
        <ng-content></ng-content>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItemClick()">
        Add
      </button>
    </div>
  `,
  imports: [NgOptimizedImage],
})
export class CardComponent {
  readonly customClass = input('');
  readonly img = input<string>('');
  addNewItem = output<void>();

  addNewItemClick() {
    this.addNewItem.emit();
  }
}
