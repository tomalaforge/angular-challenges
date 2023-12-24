import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

// $implicit is a problem
interface Students {
  name: string;
  age: number;
}

interface Cities {
  name: string;
  country: string;
}

type TItem = Students | Cities;

// Use Angular 17 syntax

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { $implicit: item, appList: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem> {
  // remove the extends object?
  @Input() list!: TItem[];

  @ContentChild('listRef', { read: TemplateRef }) // if you mistype listRef -> you won't get any warnings
  listTemplateRef!: TemplateRef<unknown>;
}
