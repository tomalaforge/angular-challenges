import { NgForOf, NgForOfContext } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  IterableDiffers,
  NgIterable,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[myFor][myForOf][myForEmpty]',
  standalone: true,
})
export class MyForDirective<T, U extends NgIterable<T> = NgIterable<T>>
  extends NgForOf<T, U>
  implements OnChanges
{
  _data: (U & NgIterable<T>) | undefined | null;

  constructor(
    public viewContainer: ViewContainerRef,
    template: TemplateRef<NgForOfContext<T, U>>,
    differs: IterableDiffers,
  ) {
    super(viewContainer, template, differs);
  }

  @Input()
  set myForOf(myForOf: (U & NgIterable<T>) | undefined | null) {
    this.ngForOf = myForOf;
    this._data = myForOf;
  }

  @Input() myForEmpty!: TemplateRef<unknown>;

  private ref?: EmbeddedViewRef<unknown>;

  ngOnChanges(changes: SimpleChanges): void {
    this.ref?.destroy();
    if (!this._data || (this._data as Array<T>).length === 0) {
      this.ref = this.viewContainer.createEmbeddedView(this.myForEmpty);
    } else {
      this.ref?.destroy();
    }
  }
}
