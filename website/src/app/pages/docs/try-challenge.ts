import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doc } from '../../doc.model';

const UPSTREAM = 'tomalaforge/angular-challenges';

/**
 * "Try this challenge" button + dialog: the ways to go from reading the doc
 * to a running challenge — one-command CLI, manual setup guides, Codespaces.
 */
@Component({
  selector: 'app-try-challenge',
  imports: [RouterLink],
  templateUrl: './try-challenge.html',
})
export class TryChallenge {
  readonly doc = input.required<Doc>();

  protected readonly open = signal(false);
  protected readonly copied = signal(false);

  protected readonly npxCommand = computed(
    () => `npx angular-challenges@latest start ${this.doc().challengeNumber}`,
  );

  protected readonly codespacesUrl = `https://codespaces.new/${UPSTREAM}?quickstart=1`;

  protected copyCommand(): void {
    navigator.clipboard?.writeText(this.npxCommand());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
