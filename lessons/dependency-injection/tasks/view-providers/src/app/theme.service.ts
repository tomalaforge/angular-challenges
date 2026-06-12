import { Injectable, signal } from '@angular/core';

export const THEME_COLORS = ['blue', 'green', 'purple', 'orange'] as const;
export type ThemeColor = (typeof THEME_COLORS)[number];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly color = signal<ThemeColor>('blue');

  nextColor(): void {
    const idx = THEME_COLORS.indexOf(this.color());
    this.color.set(THEME_COLORS[(idx + 1) % THEME_COLORS.length]);
  }
}
