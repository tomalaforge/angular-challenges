import {
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Auth } from '../../auth';
import { Theme } from '../../theme';
import { Doc } from '../../doc.model';
import { PullFile, PullMeta } from './solution.model';
import { Hunk, parsePatch } from './diff-parser';
import { highlightHunks, languageFor } from './diff-highlighter';

interface FileView extends PullFile {
  hunks: Hunk[];
}

@Component({
  selector: 'app-solution-diff',
  imports: [RouterLink],
  templateUrl: './solution-diff.html',
})
export class SolutionDiff {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly title = inject(Title);
  private readonly http = inject(HttpClient);
  protected readonly auth = inject(Auth);
  protected readonly theme = inject(Theme);
  protected readonly isDark = computed(() => this.theme.current() === 'dark');

  /** Provided by the route resolver / router input binding. */
  readonly doc = input.required<Doc>();
  readonly pr = input.required<string>();

  /**
   * The component is reused when only `:pr` changes, so the reaction state is
   * derived from `pr()` — it falls back to 'idle' for every new PR instead of
   * keeping the previous one's 'done' (which would leave the button disabled).
   */
  protected readonly reaction = linkedSignal<string, 'idle' | 'saving' | 'done' | 'error'>({
    source: this.pr,
    computation: () => 'idle',
  });

  /** 'split' on desktop, toggleable; unified is friendlier on mobile. */
  protected readonly mode = signal<'split' | 'unified'>(
    this.isBrowser && window.matchMedia('(max-width: 639px)').matches ? 'unified' : 'split',
  );

  protected readonly metaResource = httpResource<PullMeta>(() =>
    this.isBrowser ? `/api/pulls/${this.pr()}` : undefined,
  );

  protected readonly filesResource = httpResource<{ files: PullFile[] }>(() =>
    this.isBrowser ? `/api/pulls/${this.pr()}/files` : undefined,
  );

  protected readonly meta = computed(() => this.metaResource.value() ?? null);

  private readonly parsedFiles = computed<FileView[]>(() =>
    (this.filesResource.value()?.files ?? []).map((file) => ({
      ...file,
      hunks: file.patch ? parsePatch(file.patch) : [],
    })),
  );

  /** Bumped once syntax-highlighting tokens have been attached to the parsed lines. */
  private readonly highlightVersion = signal(0);

  protected readonly files = computed<FileView[]>(() => {
    // Fresh array on every recompute: the lines are mutated in place by the
    // highlighter, so an identical reference would be swallowed by the
    // computed's Object.is equality check and never reach the template.
    this.highlightVersion();
    return [...this.parsedFiles()];
  });

  /**
   * Both resources are disabled during SSR, so neither reports "loading" there.
   * The template branches on this instead: it stays false until both responses
   * arrive, which keeps the server HTML from rendering an empty diff.
   */
  protected readonly loaded = computed(
    () => this.metaResource.status() === 'resolved' && this.filesResource.status() === 'resolved',
  );

  protected readonly failed = computed(
    () => !!this.metaResource.error() || !!this.filesResource.error(),
  );

  constructor() {
    effect(() => {
      const meta = this.meta();
      this.title.setTitle(
        meta
          ? `PR #${meta.number} by ${meta.login} — ${this.doc().title} | Angular Challenges`
          : `Solution — ${this.doc().title} | Angular Challenges`,
      );
    });

    effect(() => {
      const files = this.parsedFiles();
      if (this.isBrowser && files.length) {
        untracked(() => this.highlightFiles(files));
      }
    });
  }

  private async highlightFiles(files: FileView[]): Promise<void> {
    try {
      for (const file of files) {
        const lang = languageFor(file.filename);
        if (lang) {
          await highlightHunks(lang, file.hunks);
        }
      }
      this.highlightVersion.update((v) => v + 1);
    } catch {
      // Highlighting is progressive enhancement — the plain-text diff stays readable.
    }
  }

  protected react(): void {
    if (!this.auth.me()) {
      location.href = this.auth.signInUrl();
      return;
    }
    const pr = this.pr();
    this.reaction.set('saving');
    this.http.post(`/api/pulls/${pr}/react`, {}).subscribe({
      // A response that lands after navigating to another PR must not touch its state.
      next: () => this.settle(pr, 'done'),
      error: () => this.settle(pr, 'error'),
    });
  }

  private settle(pr: string, state: 'done' | 'error'): void {
    if (this.pr() === pr) {
      this.reaction.set(state);
    }
  }
}
