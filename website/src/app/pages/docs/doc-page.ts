import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Doc } from '../../doc.model';
import { Comments } from '../../shared/comments';

@Component({
  selector: 'app-doc-page',
  imports: [RouterLink, Comments],
  templateUrl: './doc-page.html',
})
export class DocPage {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** Provided by the route resolver via component input binding. */
  readonly doc = input.required<Doc>();

  protected readonly html = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.doc().html),
  );

  protected readonly npxCommand = computed(() =>
    this.doc().command ? `npx nx serve ${this.doc().command}` : null,
  );

  protected readonly copied = signal(false);

  protected readonly difficultyClasses: Record<string, string> = {
    easy: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/30',
    hard: 'bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/30',
  };

  protected videoFlag(flag?: string): string | null {
    return { FR: '🇫🇷', ES: '🇪🇸' }[flag ?? ''] ?? null;
  }

  constructor() {
    effect(() => {
      const doc = this.doc();
      this.title.setTitle(`${doc.title} | Angular Challenges`);
      this.meta.updateTag({ name: 'description', content: doc.description });
      this.meta.updateTag({ property: 'og:title', content: doc.title });
      this.meta.updateTag({ property: 'og:description', content: doc.description });
    });
  }

  protected copyCommand(): void {
    const command = this.npxCommand();
    if (command) {
      navigator.clipboard?.writeText(command);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  protected avatar(login: string): string {
    return `https://github.com/${login}.png?size=64`;
  }
}
