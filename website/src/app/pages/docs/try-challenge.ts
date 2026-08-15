import { Component, computed, inject, input, signal } from '@angular/core';
import { Auth } from '../../auth';
import { Doc } from '../../doc.model';

const UPSTREAM = 'tomalaforge/angular-challenges';

type ForkState =
  { kind: 'idle' } | { kind: 'forking' } | { kind: 'done'; fullName: string } | { kind: 'error' };

/**
 * "Try this challenge" button + dialog: every way to go from reading the doc
 * to a running challenge — one-command CLI, fork + IDE deep links, Codespaces.
 */
@Component({
  selector: 'app-try-challenge',
  templateUrl: './try-challenge.html',
})
export class TryChallenge {
  protected readonly auth = inject(Auth);

  readonly doc = input.required<Doc>();

  protected readonly open = signal(false);
  protected readonly copied = signal(false);
  protected readonly fork = signal<ForkState>({ kind: 'idle' });

  protected readonly npxCommand = computed(
    () => `npx angular-challenges@latest start ${this.doc().challengeNumber}`,
  );

  /** The repo IDE links and Codespaces should target: the fork once it exists. */
  protected readonly targetRepo = computed(() => {
    const fork = this.fork();
    return fork.kind === 'done' ? fork.fullName : UPSTREAM;
  });

  protected readonly cloneUrl = computed(() => `https://github.com/${this.targetRepo()}.git`);
  protected readonly vscodeUrl = computed(
    () => `vscode://vscode.git/clone?url=${encodeURIComponent(this.cloneUrl())}`,
  );
  protected readonly cursorUrl = computed(
    () => `cursor://vscode.git/clone?url=${encodeURIComponent(this.cloneUrl())}`,
  );
  protected readonly jetbrainsUrl = computed(
    () =>
      `jetbrains://idea/checkout/git?idea.required.plugins.id=Git4Idea&checkout.repo=${encodeURIComponent(this.cloneUrl())}`,
  );
  protected readonly codespacesUrl = computed(
    () => `https://codespaces.new/${this.targetRepo()}?quickstart=1`,
  );

  protected copyCommand(): void {
    navigator.clipboard?.writeText(this.npxCommand());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  protected async createFork(): Promise<void> {
    if (this.fork().kind === 'forking') {
      return;
    }
    this.fork.set({ kind: 'forking' });
    try {
      const response = await fetch('/api/fork', { method: 'POST' });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.fullName) {
        throw new Error('fork failed');
      }
      this.fork.set({ kind: 'done', fullName: data.fullName });
    } catch {
      this.fork.set({ kind: 'error' });
    }
  }
}
