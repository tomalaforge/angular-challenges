import { NgForOf } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Host,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
})
export class EmptyNgForTemplateDirective<T> implements DoCheck {
  private _viewRef?: EmbeddedViewRef<T> | null;
  private _emptyTemplate?: TemplateRef<T>;
  private _isEmpty = false;

  @Input('ngForEmpty')
  public set ngForEmptyProp(value: TemplateRef<T>) {
    this._emptyTemplate = value;
  }

  public constructor(
    @Host() private readonly ngForOf: NgForOf<T>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngDoCheck(): void {
    if (this.ngForOf) {
      this._isEmpty = this.ngForOf['_ngForOf']?.length === 0;
      this.updateView();
    }
  }

  updateView() {
    if (this._isEmpty) {
      if (this._viewRef) {
        return;
      }

      if (this._emptyTemplate) {
        this.viewContainer.clear();
        this._viewRef = this.viewContainer.createEmbeddedView(
          this._emptyTemplate,
        );
      }

      return;
    }

    if (this._viewRef) {
      const viewRefIndexToRemove = this.viewContainer.indexOf(this._viewRef);
      this.viewContainer.remove(viewRefIndexToRemove);

      this._viewRef = null;
    }
  }
}
