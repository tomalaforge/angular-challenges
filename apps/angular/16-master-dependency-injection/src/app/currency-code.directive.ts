import { Directive, OnInit, inject, input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencyCode]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencyCodeDirective implements OnInit {
  currencyCode = input.required<string>();

  currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this.currencyService.patchState({ code: this.currencyCode() });
  }
}
