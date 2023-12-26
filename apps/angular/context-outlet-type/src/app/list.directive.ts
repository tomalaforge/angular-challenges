import { Directive, Input } from '@angular/core';

// Named the interfaces plural
// Could rename to Student / City

export interface Students {
  name: string;
  age: number;
}

export interface Cities {
  name: string;
  country: string;
}

//export type TItem = Students | Cities;

interface ListContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: 'ng-template[listRef]',
  standalone: true,
})
export class ListDirective<TItem extends object> {
  @Input('listRef') data!: TItem[];
  @Input() index!: number;

  static ngTemplateContextGuard<TContextItem extends object>(
    directive: ListDirective<TContextItem>,
    context: unknown,
  ): context is ListContext<TContextItem> {
    return true;
  }
}
