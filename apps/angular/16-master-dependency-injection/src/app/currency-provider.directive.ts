import { Directive, Input, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencyProvider]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyProviderDirective implements OnInit {
  @Input() currencyCode!: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.setState({ code: this.currencyCode });
  }
}
