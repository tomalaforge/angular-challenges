import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

// If you use Angular 17 control-flow syntax, you don't need CommonModule
// but you need CommonModule here for ngTemplateOutlet

// I deleted the EmptyRef

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (item of list; track item; let i = $index) {
      <div>
        <ng-container
          *ngTemplateOutlet="
            listTemplateRef;
            context: { $implicit: item, appList: item, index: i }
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

  @ContentChild('listRef', { read: TemplateRef })
  listTemplateRef!: TemplateRef<unknown>;
}
