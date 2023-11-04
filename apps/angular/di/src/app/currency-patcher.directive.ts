import { Directive, Input, OnInit, inject } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[appCurrencyCode]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyCodePatcherDirective implements OnInit {
  @Input({ required: true }) appCurrencyCode = 'EUR';

  private readonly currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this.currencyService.patchState({ code: this.appCurrencyCode });
  }
}
