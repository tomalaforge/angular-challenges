import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[itemRef]',
  standalone: true,
})
export class ItemRefDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="itemRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  addNewItem = output<void>();
  readonly list = input<any[] | null>(null);

  // [For My Ref] we can leverage on ng-content and template to reduce duplication and better code managment with reusability without changing much
  // Using ContentChild to get the template reference from projected content read as TemplateRef without it doesnt give TemplateRef
  @ContentChild(ItemRefDirective, { read: TemplateRef }) itemRef!: TemplateRef<{
    $implicit: any;
  }>;
}
