import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    // Cypress 14+ defaults justInTimeCompile to true (webpack only), which can
    // intermittently run 0 tests in CI. Remove this line to opt back in.
    justInTimeCompile: false,
  },
});
