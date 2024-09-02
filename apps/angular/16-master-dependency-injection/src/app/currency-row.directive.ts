import { Directive, Input, OnInit, inject } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencyRow]',
  providers: [CurrencyService], // Provide a unique instance of CurrencyService per row
})
export class CurrencyRowDirective implements OnInit {
  @Input() productCurrency!: string;

  private currencyService = inject(CurrencyService);

  ngOnInit() {
    // Configure the service with the product's currency
    this.currencyService.setCurrency(this.productCurrency);
  }
}
