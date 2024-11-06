import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface NgForDirectiveContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[appNgFor]',
  standalone: true,
})
export class NgForDirective<T> {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);

  appNgForOf = input<T[]>();
  appNgForEmpty = input<TemplateRef<unknown>>();

  constructor() {
    effect(() => {
      const items = this.appNgForOf();
      const empty = this.appNgForEmpty();
      this.render(items, empty);
    });
  }

  private render(items?: T[], empty?: TemplateRef<unknown>) {
    if (items && items.length > 0) {
      this.viewContainer.clear();
      items.forEach((item) => {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: item,
        });
      });
    } else {
      this.viewContainer.clear();
      if (empty) {
        this.viewContainer.createEmbeddedView(empty);
      }
    }
  }

  /**
   * The guard body is not used at runtime, and included only to avoid
   * TypeScript errors.
   * @See https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
   */
  static ngTemplateContextGuard<T>(
    dir: NgForDirective<T>,
    ctx: any,
  ): ctx is NgForDirectiveContext<T> {
    return true;
  }
}
