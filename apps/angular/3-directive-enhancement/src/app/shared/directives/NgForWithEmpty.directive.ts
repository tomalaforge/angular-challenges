import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ngForWithEmpty]',
})
export class NgForWithEmptyDirective<T> implements OnChanges {
  @Input() ngForWithEmptyOf: T[] | null = [];
  @Input() ngForWithEmptyEmpty?: TemplateRef<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  public ngOnChanges() {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.ngForWithEmptyOf && this.ngForWithEmptyOf.length > 0) {
      for (let item of this.ngForWithEmptyOf) {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: item,
        });
      }
    } else if (this.ngForWithEmptyEmpty) {
      this.viewContainer.createEmbeddedView(this.ngForWithEmptyEmpty);
    }
  }
}
