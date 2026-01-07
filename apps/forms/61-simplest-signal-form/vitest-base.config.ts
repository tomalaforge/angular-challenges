import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const teardown = process.env['TEARDOWN'] !== 'false';

export default defineConfig({
  test: {
    setupFiles: [
      'apps/forms/61-simplest-signal-form/src/test-setup/no-teardown.ts',
    ],
    // testTimeout: 3_000,
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
