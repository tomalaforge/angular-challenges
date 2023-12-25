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

/*

// Started with same approach as person directive

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface Students {
  name: string;
  age: number;
}

export interface Cities {
  name: string;
  country: string;
}

export type TItem = Students | Cities;

interface ListContext<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  selector: 'ng-template[listRef]',
  standalone: true,
})
export class ListDirective<T> {
  @Input() listRef!: string;
  @Input() list!: T;
  @Input() index!: number;

  //static ngTemplateGuard_list(dir: ListDirective, expr: TItem): expr is Students {
  //  return true;
  //}

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<ListContext<T>>,
  ) {}

  ngOnInit(): void {
    const context = {
      $implicit: this.list,
      appList: this.list,
      index: this.index,
    };
    this.viewContainerRef.createEmbeddedView(this.templateRef, context);
  }

  static ngTemplateContextGuard<TContext>(
    directive: ListDirective<TContext>,
    context: unknown,
  ): context is ListContext<TContext> {
    return true;
  }
}
*/
