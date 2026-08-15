import { Component, PLATFORM_ID, computed, inject, output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  readonly menuToggled = output<void>();
  protected readonly auth = inject(Auth);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly statsResource = httpResource<{ stars: number }>(() =>
    this.isBrowser ? '/api/stats' : undefined,
  );

  protected readonly stars = computed<string | null>(() => {
    const stars = this.statsResource.value()?.stars;
    if (!stars) {
      return null;
    }
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : `${stars}`;
  });
}
