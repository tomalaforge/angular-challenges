import { Injectable, signal } from '@angular/core';
import type { WebContainer, WebContainerProcess } from '@webcontainer/api';
import { ChallengeStarter } from '../../doc.model';
import { buildProjectTree } from './starter-project';

export type RunnerPhase =
  'idle' | 'booting' | 'installing' | 'starting' | 'running' | 'testing' | 'error';

// eslint-disable-next-line no-control-regex
const ANSI_ESCAPES = /\x1b\[[0-9;?]*[A-Za-z]|\x1b\][^\x07]*(?:\x07|\x1b\\)|\x1b[=>]|\r/g;

/**
 * Runs a challenge's synthesized project inside a WebContainer: one container
 * per page load, `npm install` once, then `ng serve` and/or the test runner.
 * Requires cross-origin isolation (COOP/COEP headers on the editor route).
 */
@Injectable()
export class ChallengeRunner {
  readonly phase = signal<RunnerPhase>('idle');
  readonly output = signal('');
  readonly previewUrl = signal<string | null>(null);

  private container?: Promise<WebContainer>;
  private installed?: Promise<boolean>;
  private serveProcess?: WebContainerProcess;
  private testProcess?: WebContainerProcess;

  get supported(): boolean {
    return typeof window !== 'undefined' && window.crossOriginIsolated === true;
  }

  async serve(starter: ChallengeStarter, contents: ReadonlyMap<string, string>): Promise<void> {
    try {
      const container = await this.prepare(starter, contents);
      if (!(await this.installed!)) {
        return;
      }
      this.serveProcess?.kill();
      this.phase.set('starting');
      this.append('\n$ npm start\n');
      container.on('server-ready', (_port, url) => {
        this.previewUrl.set(url);
        this.phase.set('running');
      });
      this.serveProcess = await container.spawn('npm', ['start']);
      this.pipe(this.serveProcess);
    } catch (error) {
      this.fail(error);
    }
  }

  async runTests(starter: ChallengeStarter, contents: ReadonlyMap<string, string>): Promise<void> {
    try {
      const container = await this.prepare(starter, contents);
      if (!(await this.installed!)) {
        return;
      }
      this.testProcess?.kill();
      const wasRunning = this.phase() === 'running';
      this.phase.set('testing');
      this.append('\n$ npm test\n');
      this.testProcess = await container.spawn('npm', ['test']);
      this.pipe(this.testProcess);
      const code = await this.testProcess.exit;
      this.append(code === 0 ? '\n✓ Tests passed\n' : `\n✗ Tests failed (exit code ${code})\n`);
      this.phase.set(wasRunning ? 'running' : 'idle');
    } catch (error) {
      this.fail(error);
    }
  }

  /** Push edited sources into the running container (dev server rebuilds). */
  async syncFile(path: string, content: string): Promise<void> {
    if (!this.container) {
      return;
    }
    const container = await this.container;
    await container.fs.writeFile(`/${path}`, content).catch(() => undefined);
  }

  async destroy(): Promise<void> {
    this.serveProcess?.kill();
    this.testProcess?.kill();
    (await this.container)?.teardown();
  }

  private async prepare(
    starter: ChallengeStarter,
    contents: ReadonlyMap<string, string>,
  ): Promise<WebContainer> {
    if (!this.container) {
      this.phase.set('booting');
      this.append('Booting WebContainer…\n');
      this.container = import('@webcontainer/api').then(({ WebContainer }) =>
        WebContainer.boot({ coep: 'credentialless' }),
      );
    }
    const container = await this.container;
    await container.mount(buildProjectTree(starter, contents));
    if (!this.installed) {
      this.installed = this.install(container);
    }
    return container;
  }

  private async install(container: WebContainer): Promise<boolean> {
    this.phase.set('installing');
    this.append('$ npm install (this can take a minute or two)\n');
    const process = await container.spawn('npm', [
      'install',
      '--no-audit',
      '--no-fund',
      '--loglevel=error',
    ]);
    this.pipe(process);
    const code = await process.exit;
    if (code !== 0) {
      this.append(`\n✗ npm install failed (exit code ${code})\n`);
      this.phase.set('error');
      return false;
    }
    this.append('\n✓ Dependencies installed\n');
    return true;
  }

  private pipe(process: WebContainerProcess): void {
    void process.output.pipeTo(
      new WritableStream({
        write: (chunk) => this.append(chunk.replace(ANSI_ESCAPES, '')),
      }),
    );
  }

  private append(text: string): void {
    if (text) {
      // Keep the log bounded so a chatty dev server can't grow memory forever.
      this.output.update((current) => (current + text).slice(-100_000));
    }
  }

  private fail(error: unknown): void {
    this.append(`\n✗ ${error instanceof Error ? error.message : String(error)}\n`);
    this.phase.set('error');
  }
}
