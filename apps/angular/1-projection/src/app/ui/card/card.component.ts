import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="img()" width="200" height="200" />

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItemClick()">
        Add
      </button>
    </div>
  `,
  imports: [NgOptimizedImage, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<Teacher[] | City[] | Student[] | null>(null);
  readonly customClass = input('');
  readonly img = input<string>('');
  addNewItem = output<void>();
  deleteItem = output<number>();
  readonly itemTemplate = input.required<TemplateRef<{
    $implicit: Teacher | Student | City;
  }> | null>();
  addNewItemClick() {
    this.addNewItem.emit();
  }
  deleteItemClick(id: number) {
    this.deleteItem.emit(id);
  }
}
