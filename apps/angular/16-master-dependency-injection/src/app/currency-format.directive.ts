import { Directive, Input, TemplateRef, ViewContainerRef, Inject } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencyFormat]',
})
export class CurrencyFormatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(CurrencyService) private currencyService: CurrencyService
  ) {}

  @Input() set currencyFormat(value: { amount: number; currencyCode: string }) {
    const formattedValue = this.currencyService.format(value.amount, value.currencyCode);
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: formattedValue });
  }
}
