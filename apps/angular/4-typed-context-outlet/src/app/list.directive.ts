import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[list]'
})
export class ListDirective<T> {
  @Input() set list(data: T[]) {
    this.viewContainer.clear();
    data.forEach((item, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index
      });
    });
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
