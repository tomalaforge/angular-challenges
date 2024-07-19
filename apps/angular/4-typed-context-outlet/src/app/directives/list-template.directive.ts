import { Directive, input } from '@angular/core';
import { ListTemplateContext } from '../models/context';

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListTemplateDirective<TItem> {
  appList = input.required<TItem[]>();
  static ngTemplateContextGuard<TContextItem>(
    dir: ListTemplateDirective<TContextItem>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContextItem> {
    return true;
  }
}
