import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]', // same selector as NgForOf Directive of CommonModule
  standalone: true,
})
export class NgForEmptyDirective<T> implements OnChanges {
  private viewContainerRef = inject(ViewContainerRef);
  @Input() ngForOf?: T[] = undefined;
  @Input() ngForEmpty!: TemplateRef<unknown>;
  private ref?: EmbeddedViewRef<unknown>;

  ngOnChanges(): void {
    console.log(this.ngForEmpty);
    this.ref?.destroy();
    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.ref = this.viewContainerRef.createEmbeddedView(this.ngForEmpty);
      return;
    }
  }
}
