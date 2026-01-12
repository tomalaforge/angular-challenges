import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { beforeEach } from 'vitest';

/**
 * @see https://github.com/angular/angular-cli/issues/31733
 */
const symbol = Symbol.for('@angular-challenge/testbed-setup');
const g = globalThis as unknown as { [symbol]: boolean };

if (!g[symbol]) {
  g[symbol] = true;

  getTestBed().resetTestEnvironment();
  getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(),
    { teardown: { destroyAfterEach: false } },
  );
}

beforeEach(() => getTestBed().resetTestingModule());
