import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Auth } from '../../auth';
import { ChallengeStarter, Doc, StarterFile } from '../../doc.model';
import { CONTENT_MAP } from '../../generated/content-map';
import { STARTER_MAP } from '../../generated/starter-map';
import { SiteHeader } from '../../layout/site-header';
import { MonacoLoader } from '../../shared/monaco-loader';
import { Theme } from '../../theme';
import { ChallengeRunner } from './challenge-runner';

type PanelTab = 'output' | 'preview';
type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'done'; url: string }
  | { kind: 'error'; message: string };

/**
 * In-browser workspace for a challenge: Monaco over the starter code
 * (generated from apps/<category>/<n>-<name> at build time), a WebContainer
 * to serve the app and run its tests, and PR submission via the signed-in
 * user's GitHub account (fork-based, title `Answer:<n>`).
 */
@Component({
  selector: 'app-editor-page',
  imports: [SiteHeader],
  providers: [ChallengeRunner],
  templateUrl: './editor-page.html',
})
export class EditorPage {
  private readonly title = inject(Title);
  private readonly theme = inject(Theme);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly monacoLoader = inject(MonacoLoader);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly auth = inject(Auth);
  protected readonly runner = inject(ChallengeRunner);

  /** Provided by the router via component input binding. */
  readonly category = input.required<string>();
  readonly slug = input.required<string>();

  protected readonly docUrl = computed(() => `/challenges/${this.category()}/${this.slug()}`);

  protected readonly doc = signal<Doc | undefined>(undefined);
  protected readonly starter = signal<ChallengeStarter | undefined>(undefined);
  protected readonly notFound = signal(false);
  protected readonly selectedPath = signal<string | undefined>(undefined);
  protected readonly modifiedPaths = signal<ReadonlySet<string>>(new Set());
  protected readonly editorReady = signal(false);
  protected readonly panelTab = signal<PanelTab | null>(null);
  protected readonly submitState = signal<SubmitState>({ kind: 'idle' });

  /** Editable text files — binary assets are mounted for the preview only. */
  protected readonly files = computed<StarterFile[]>(
    () => this.starter()?.files.filter((f) => !f.base64) ?? [],
  );
  protected readonly previewSrc = computed<SafeResourceUrl | null>(() => {
    const url = this.runner.previewUrl();
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
  protected readonly busy = computed(() =>
    ['booting', 'installing', 'starting', 'testing'].includes(this.runner.phase()),
  );

  private readonly editorHost = viewChild.required<ElementRef<HTMLElement>>('editorHost');
  private readonly outputPane = viewChild<ElementRef<HTMLElement>>('outputPane');
  private readonly monaco = signal<any>(undefined);
  private editor: any;
  private readonly models = new Map<string, any>();
  private readonly originals = new Map<string, string>();
  private readonly syncTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor() {
    effect(() => {
      const url = this.docUrl();
      const loadStarter = STARTER_MAP[url];
      if (!loadStarter) {
        this.notFound.set(true);
        return;
      }
      loadStarter().then((starter) => {
        if (url === this.docUrl()) {
          this.starter.set(starter);
          this.selectedPath.set(starter.files[0]?.path);
        }
      });
      CONTENT_MAP[url]?.().then((doc) => {
        if (url === this.docUrl()) {
          this.doc.set(doc);
          this.title.setTitle(`Editor: ${doc.title} | Angular Challenges`);
        }
      });
    });

    afterNextRender(() => {
      this.monacoLoader.load().then((monaco) => this.monaco.set(monaco));
    });

    effect(() => {
      const monaco = this.monaco();
      const files = this.files();
      if (monaco && files.length > 0 && !this.editor) {
        this.createEditor(monaco, files);
      }
    });

    effect(() => {
      const path = this.selectedPath();
      if (this.editor && path) {
        this.editor.setModel(this.models.get(path));
        this.editor.focus();
      }
    });

    effect(() => {
      this.monaco()?.editor.setTheme(this.theme.current() === 'dark' ? 'vs-dark' : 'vs');
    });

    // Switch to the preview as soon as the dev server is up.
    effect(() => {
      if (this.runner.previewUrl()) {
        this.panelTab.set('preview');
      }
    });

    // Keep the log scrolled to the bottom.
    effect(() => {
      this.runner.output();
      const pane = this.outputPane()?.nativeElement;
      if (pane) {
        pane.scrollTop = pane.scrollHeight;
      }
    });

    this.destroyRef.onDestroy(() => {
      this.editor?.dispose();
      this.models.forEach((model) => model.dispose());
      this.syncTimers.forEach((timer) => clearTimeout(timer));
      void this.runner.destroy();
    });
  }

  private createEditor(monaco: any, files: StarterFile[]): void {
    // Starter apps import Angular packages that are not resolvable in the
    // browser; keep syntax checking but drop the noisy semantic errors.
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
    });

    for (const file of files) {
      const uri = monaco.Uri.parse(`file:///${file.path}`);
      const model =
        monaco.editor.getModel(uri) ?? monaco.editor.createModel(file.content, undefined, uri);
      model.setValue(file.content);
      this.originals.set(file.path, file.content);
      this.models.set(file.path, model);
      model.onDidChangeContent(() => this.onFileChanged(file.path, model));
    }

    this.editor = monaco.editor.create(this.editorHost().nativeElement, {
      model: this.models.get(this.selectedPath() ?? files[0].path),
      theme: this.theme.current() === 'dark' ? 'vs-dark' : 'vs',
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 13,
      scrollBeyondLastLine: false,
      padding: { top: 12 },
      fixedOverflowWidgets: true,
    });
    this.editorReady.set(true);
  }

  private onFileChanged(path: string, model: any): void {
    const modified = new Set(this.modifiedPaths());
    const changed = model.getValue() !== this.originals.get(path);
    if (changed !== modified.has(path)) {
      changed ? modified.add(path) : modified.delete(path);
      this.modifiedPaths.set(modified);
    }
    // Write-through to the container (debounced) so the dev server rebuilds.
    clearTimeout(this.syncTimers.get(path));
    this.syncTimers.set(
      path,
      setTimeout(() => void this.runner.syncFile(path, model.getValue()), 500),
    );
  }

  /** Current editor contents (falls back to originals before Monaco loads). */
  private currentContents(): Map<string, string> {
    const contents = new Map<string, string>();
    for (const file of this.files()) {
      contents.set(file.path, this.models.get(file.path)?.getValue() ?? file.content);
    }
    return contents;
  }

  protected runApp(): void {
    const starter = this.starter();
    if (!starter) {
      return;
    }
    this.panelTab.set('output');
    if (!this.runner.supported) {
      return;
    }
    void this.runner.serve(starter, this.currentContents());
  }

  protected runTests(): void {
    const starter = this.starter();
    if (!starter) {
      return;
    }
    this.panelTab.set('output');
    if (!this.runner.supported) {
      return;
    }
    void this.runner.runTests(starter, this.currentContents());
  }

  protected async submitPr(): Promise<void> {
    const doc = this.doc();
    const starter = this.starter();
    if (!doc?.challengeNumber || !starter || this.submitState().kind === 'submitting') {
      return;
    }
    const files = [...this.modifiedPaths()].map((path) => ({
      path,
      content: this.models.get(path)?.getValue() ?? '',
    }));
    this.submitState.set({ kind: 'submitting' });
    try {
      const response = await fetch(`/api/challenges/${doc.challengeNumber}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appPath: starter.appPath, files }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error ?? `Submission failed (${response.status})`);
      }
      this.submitState.set({ kind: 'done', url: data.url });
    } catch (error) {
      this.submitState.set({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Submission failed',
      });
    }
  }

  protected selectFile(path: string): void {
    this.selectedPath.set(path);
  }

  protected closePanel(): void {
    this.panelTab.set(null);
  }

  protected resetCurrentFile(): void {
    const path = this.selectedPath();
    if (path) {
      this.models.get(path)?.setValue(this.originals.get(path));
    }
  }

  protected resetAllFiles(): void {
    this.models.forEach((model, path) => model.setValue(this.originals.get(path)));
  }

  /** `src/app/ui/card.ts` -> { dir: 'app/ui', name: 'card.ts' } for the tree. */
  protected fileLabel(path: string): { dir: string; name: string } {
    const trimmed = path.replace(/^src\//, '');
    const lastSlash = trimmed.lastIndexOf('/');
    return lastSlash === -1
      ? { dir: '', name: trimmed }
      : { dir: trimmed.slice(0, lastSlash), name: trimmed.slice(lastSlash + 1) };
  }
}
