import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { ListDirective } from './list.directive';

// If you use Angular 17 control-flow syntax, you don't need CommonModule
// you can import ngTemplateOutlet separately without CommonModule as well

// I deleted the EmptyRef

// context: { $implicit: item, appList: item, index: i }
// appList -> redundant ?

@Component({
  selector: 'list',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @for (item of list; track item; let i = $index) {
      <div>
        <ng-container
          *ngTemplateOutlet="
            listTemplateRef;
            context: { $implicit: item, index: i }
          "></ng-container>
      </div>
    } @empty {
      <ng-template>No Template</ng-template>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<unknown>;
}
