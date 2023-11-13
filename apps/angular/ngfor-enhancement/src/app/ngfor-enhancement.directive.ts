import { NgFor } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf'],
    },
  ],
})
export class NgForEnhancementDirective<T> implements DoCheck {
  private tpr = inject(TemplateRef);
  private vcf = inject(ViewContainerRef);
  private evr!: EmbeddedViewRef<unknown>;

  @Input() ngForOf?: T[] = undefined;
  @Input() ngForEmpty!: TemplateRef<unknown>;

  ngDoCheck(): void {
    this.evr?.destroy();
    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.evr = this.vcf.createEmbeddedView(this.ngForEmpty);
    }
  }
}
