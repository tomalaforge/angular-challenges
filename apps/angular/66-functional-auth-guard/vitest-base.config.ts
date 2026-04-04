import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: [
      'apps/angular/66-functional-auth-guard/src/test-setup/no-teardown.ts',
    ],
    testTimeout: 3_000,
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          args: ['--remote-debugging-port=9222'],
        },
      }),
      instances: [{ browser: 'chromium' }],
    },
  },
});
