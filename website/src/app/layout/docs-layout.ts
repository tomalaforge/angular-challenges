import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MANIFEST } from '../generated/manifest';
import { SiteHeader } from './site-header';

@Component({
  selector: 'app-docs-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SiteHeader],
  templateUrl: './docs-layout.html',
})
export class DocsLayout {
  private readonly router = inject(Router);

  protected readonly manifest = MANIFEST;
  protected readonly menuOpen = signal(false);
  protected readonly query = signal('');

  protected readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split('#')[0].split('?')[0]),
    ),
    { initialValue: this.router.url.split('#')[0].split('?')[0] },
  );

  protected readonly searchResults = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (q.length < 2) {
      return [];
    }
    const all = [
      ...this.manifest.guides,
      ...this.manifest.challenges.flatMap((g) => g.items),
    ];
    return all
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      )
      .slice(0, 10);
  });

  protected isCategoryOpen(category: string): boolean {
    return this.currentUrl().startsWith(`/challenges/${category}`);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.query.set('');
  }
}
