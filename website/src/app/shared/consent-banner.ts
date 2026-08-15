import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Consent } from '../consent';

@Component({
  selector: 'app-consent-banner',
  templateUrl: './consent-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentBanner {
  protected readonly consent = inject(Consent);
}
