import { Directive, inject, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Directive({
  selector: '[code]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencyDirective implements OnInit {
  currencyService = inject(CurrencyService);

  @Input() code = '';

  ngOnInit() {
    this.currencyService.patchState({ code: this.code });
  }
}
