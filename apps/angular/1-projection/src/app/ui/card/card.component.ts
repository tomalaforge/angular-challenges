import { CommonModule, NgOptimizedImage } from '@angular/common';
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
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              rowTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="Add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
})
export class CardComponent {
  Add = output();
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  @ContentChild('rowTemplate') rowTemplate!: TemplateRef<any>;
}
