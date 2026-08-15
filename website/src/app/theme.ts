import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

const STORAGE_KEY = 'ac-theme';

export type ThemeName = 'light' | 'dark';

/**
 * Light/dark mode. The inline script in index.html applies the same resolution
 * (stored choice, then OS preference) before first paint to avoid a flash;
 * this service takes over from there and persists explicit toggles.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly current = signal<ThemeName>(this.initial());

  constructor() {
    effect(() => {
      const theme = this.current();
      if (this.isBrowser) {
        this.document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    });
  }

  toggle(): void {
    const next: ThemeName = this.current() === 'dark' ? 'light' : 'dark';
    this.current.set(next);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  private initial(): ThemeName {
    if (!this.isBrowser) {
      return 'dark';
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
