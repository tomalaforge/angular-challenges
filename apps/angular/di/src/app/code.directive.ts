import { Directive, effect, inject, input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  standalone: true,
  selector: '[code]',
  providers: [CurrencyService],
})
export class CodeDirective {
  code = input.required<string>();
  currencyService = inject(CurrencyService);

  constructor() {
    effect(
      () => {
        this.currencyService.patchState({ code: this.code() });
      },
      // I think this is safe because the value used to set the state doesn't
      // come from the service, but is there a better way?
      { allowSignalWrites: true },
    );
  }
}
