import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

const GA_MEASUREMENT_ID = 'G-6BXJ62W6G5';
const ADSENSE_CLIENT = 'ca-pub-2438923752868254';
const STORAGE_KEY = 'ac-consent';

export type ConsentChoice = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie consent for the Google tags. Nothing from Google is requested until the
 * visitor accepts: `index.html` only declares Consent Mode v2 defaults (all denied),
 * and this service injects gtag.js and AdSense — and flips the signals to granted —
 * once, on acceptance. The choice is remembered in `localStorage`.
 */
@Injectable({ providedIn: 'root' })
export class Consent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);

  private readonly choice = signal<ConsentChoice | null>(null);
  private tagsInjected = false;

  /** Null until the visitor has answered the banner. */
  readonly decision = this.choice.asReadonly();
  readonly granted = computed(() => this.choice() === 'granted');

  /** The banner is browser-only: SSR must not render it into the cached HTML. */
  readonly bannerVisible = signal(false);

  constructor() {
    if (!this.isBrowser) {
      return;
    }
    const stored = this.read();
    this.choice.set(stored);
    if (stored === 'granted') {
      this.injectTags();
    }
    this.bannerVisible.set(stored === null);
  }

  accept(): void {
    this.persist('granted');
    this.update('granted');
    this.injectTags();
    this.bannerVisible.set(false);
  }

  reject(): void {
    this.persist('denied');
    // The tags may already be loaded from an earlier "accept": tell them to stop
    // using storage, and drop the cookies they set in the meantime.
    this.update('denied');
    this.clearAnalyticsCookies();
    this.bannerVisible.set(false);
  }

  /** Lets the visitor change their mind — wired to the "Cookie settings" footer link. */
  reopen(): void {
    this.bannerVisible.set(true);
  }

  private read(): ConsentChoice | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'granted' || stored === 'denied' ? stored : null;
    } catch {
      // Storage can be unavailable (private mode, blocked cookies): ask again.
      return null;
    }
  }

  private persist(choice: ConsentChoice): void {
    this.choice.set(choice);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // The choice still applies to this page view, it just isn't remembered.
    }
  }

  private update(choice: ConsentChoice): void {
    window.gtag?.('consent', 'update', {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
      personalization_storage: choice,
    });
  }

  private injectTags(): void {
    if (this.tagsInjected) {
      return;
    }
    this.tagsInjected = true;

    this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
    window.gtag?.('js', new Date());
    window.gtag?.('config', GA_MEASUREMENT_ID);

    const ads = this.loadScript(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
    );
    ads.crossOrigin = 'anonymous';
  }

  private loadScript(src: string): HTMLScriptElement {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = src;
    this.document.head.appendChild(script);
    return script;
  }

  private clearAnalyticsCookies(): void {
    const domain = location.hostname;
    for (const cookie of this.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga') && !name.startsWith('_gid')) {
        continue;
      }
      // The tag may have written the cookie on either the exact host or the
      // registrable domain, so expire both.
      for (const scope of ['', `; domain=${domain}`, `; domain=.${domain}`]) {
        this.document.cookie = `${name}=; Path=/; Max-Age=0${scope}`;
      }
    }
  }
}
