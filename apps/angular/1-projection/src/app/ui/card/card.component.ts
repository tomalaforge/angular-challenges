import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  TemplateRef,
} from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';
interface CardTemplateContext {
  $implicit: TCardTuple;
}

type TCardTuple = Student | Teacher | City;

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-header]" />

      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="template()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem($event)">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  public addNewItem: OutputEmitterRef<Event> = output<Event>();

  public template: InputSignal<TemplateRef<CardTemplateContext>> =
    input.required<TemplateRef<CardTemplateContext>>();
  readonly list = input<TCardTuple[] | null>(null);
  readonly customClass = input('');

  public onAddNewItem(event: Event): void {
    this.addNewItem.emit(event);
  }
}
