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
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Doc, StarterFile } from '../../doc.model';
import { CONTENT_MAP } from '../../generated/content-map';
import { STARTER_MAP } from '../../generated/starter-map';
import { SiteHeader } from '../../layout/site-header';
import { MonacoLoader } from '../../shared/monaco-loader';
import { Theme } from '../../theme';

/**
 * In-browser Monaco editor over a challenge's starter code (generated from
 * apps/<category>/<n>-<name> at build time). Edits live in memory only — this
 * is a playground to explore the starter files, not a submission flow yet.
 */
@Component({
  selector: 'app-editor-page',
  imports: [RouterLink, SiteHeader],
  templateUrl: './editor-page.html',
})
export class EditorPage {
  private readonly title = inject(Title);
  private readonly theme = inject(Theme);
  private readonly monacoLoader = inject(MonacoLoader);
  private readonly destroyRef = inject(DestroyRef);

  /** Provided by the router via component input binding. */
  readonly category = input.required<string>();
  readonly slug = input.required<string>();

  protected readonly docUrl = computed(() => `/challenges/${this.category()}/${this.slug()}`);

  protected readonly doc = signal<Doc | undefined>(undefined);
  protected readonly files = signal<StarterFile[] | undefined>(undefined);
  protected readonly notFound = signal(false);
  protected readonly selectedPath = signal<string | undefined>(undefined);
  protected readonly modifiedPaths = signal<ReadonlySet<string>>(new Set());
  protected readonly editorReady = signal(false);

  private readonly editorHost = viewChild.required<ElementRef<HTMLElement>>('editorHost');
  private readonly monaco = signal<any>(undefined);
  private editor: any;
  private readonly models = new Map<string, any>();
  private readonly originals = new Map<string, string>();

  constructor() {
    effect(() => {
      const url = this.docUrl();
      const loadStarter = STARTER_MAP[url];
      if (!loadStarter) {
        this.notFound.set(true);
        return;
      }
      loadStarter.call(undefined).then((files) => {
        if (url === this.docUrl()) {
          this.files.set(files);
          this.selectedPath.set(files[0]?.path);
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
      if (monaco && files && !this.editor) {
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

    this.destroyRef.onDestroy(() => {
      this.editor?.dispose();
      this.models.forEach((model) => model.dispose());
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
      model.onDidChangeContent(() => {
        const modified = new Set(this.modifiedPaths());
        const changed = model.getValue() !== this.originals.get(file.path);
        if (changed !== modified.has(file.path)) {
          changed ? modified.add(file.path) : modified.delete(file.path);
          this.modifiedPaths.set(modified);
        }
      });
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

  protected selectFile(path: string): void {
    this.selectedPath.set(path);
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
