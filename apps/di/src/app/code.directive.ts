import { Directive, Input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[code]',
  standalone: true,
  providers: [CurrencyService],
})
export class CodeDirective {
  @Input() code!: string;
  constructor(private currencyService: CurrencyService) {}
  ngOnInit() {
    this.currencyService.patchState({ code: this.code });
  }
}
