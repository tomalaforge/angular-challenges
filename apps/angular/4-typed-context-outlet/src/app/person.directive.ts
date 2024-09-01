import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[person]'
})
export class PersonDirective {
  @Input() set person(data: { name: string, age: number }) {
    this.viewContainer.clear();
    if (this.templateRef) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        name: data.name,
        age: data.age
      });
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
