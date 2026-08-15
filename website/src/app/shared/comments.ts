import {
  Component,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** giscus comment thread — same repo/category config as the previous docs site. */
@Component({
  selector: 'app-comments',
  template: `
    <div class="mt-10 border-t border-neutral-800 pt-8">
      <div #host></div>
    </div>
  `,
})
export class Comments {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');

  /** Changing term reloads the thread (component instance is reused across routes). */
  readonly term = input.required<string>();

  constructor() {
    effect(() => {
      this.term();
      if (!this.isBrowser) {
        return;
      }
      const container = this.host().nativeElement;
      container.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      const attrs: Record<string, string> = {
        'data-repo': 'tomalaforge/angular-challenges',
        'data-repo-id': 'R_kgDOIXXIfw',
        'data-category': 'Announcements',
        'data-category-id': 'DIC_kwDOIXXIf84CSZF_',
        'data-mapping': 'specific',
        'data-term': this.term(),
        'data-strict': '0',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'bottom',
        'data-theme': 'preferred_color_scheme',
        'data-lang': 'en',
        'data-loading': 'lazy',
      };
      for (const [key, value] of Object.entries(attrs)) {
        script.setAttribute(key, value);
      }
      container.appendChild(script);
    });
  }
}
