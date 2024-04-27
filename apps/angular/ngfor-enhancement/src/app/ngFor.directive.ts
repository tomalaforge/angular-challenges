import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
// import { EmptyDirective } from './empty.directive';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
})
export class NgForDirective<T> implements DoCheck {
  private viewCRef = inject(ViewContainerRef);

  private emptyTemplateRef!: EmbeddedViewRef<unknown>;

  @Input() ngForOf: T[] = [];
  @Input() ngForEmpty!: TemplateRef<unknown>;

  ngDoCheck(): void {
    if (this.emptyTemplateRef) {
      this.emptyTemplateRef.destroy();
    }

    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.viewCRef.clear();
      this.emptyTemplateRef = this.viewCRef.createEmbeddedView(this.ngForEmpty);
      return;
    }
  }
}
