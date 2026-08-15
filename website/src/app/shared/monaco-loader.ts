import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

const MONACO_VERSION = '0.52.2';
const MONACO_ROOT = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min`;

/**
 * Loads the Monaco editor lazily from a CDN via its AMD loader, so the editor
 * page adds nothing to the app bundle. Resolves with the global `monaco` API.
 */
@Injectable({ providedIn: 'root' })
export class MonacoLoader {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private monaco?: Promise<any>;

  load(): Promise<any> {
    if (!this.isBrowser) {
      // Never resolves on the server; callers gate on afterNextRender anyway.
      return new Promise(() => {});
    }
    return (this.monaco ??= new Promise((resolve, reject) => {
      const win = this.document.defaultView as any;

      // Same-origin blob proxy so Monaco can spawn its workers from the CDN.
      win.MonacoEnvironment = {
        getWorkerUrl: () =>
          URL.createObjectURL(
            new Blob(
              [
                `self.MonacoEnvironment={baseUrl:'${MONACO_ROOT}/'};importScripts('${MONACO_ROOT}/vs/base/worker/workerMain.js');`,
              ],
              { type: 'text/javascript' },
            ),
          ),
      };

      const boot = () => {
        win.require.config({ paths: { vs: `${MONACO_ROOT}/vs` } });
        win.require(['vs/editor/editor.main'], () => resolve(win.monaco));
      };
      if (typeof win.require === 'function' && win.require.config) {
        boot();
        return;
      }
      const script = this.document.createElement('script');
      script.src = `${MONACO_ROOT}/vs/loader.js`;
      script.onload = boot;
      script.onerror = () => reject(new Error('Failed to load the Monaco editor.'));
      this.document.head.appendChild(script);
    }));
  }
}
