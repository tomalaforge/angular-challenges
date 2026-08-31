import { Component, PLATFORM_ID, computed, inject, input, output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';
import { Theme } from '../theme';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  readonly showMenu = input(true);
  readonly menuToggled = output<void>();
  protected readonly auth = inject(Auth);
  protected readonly theme = inject(Theme);

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
