import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: 'lessons/rxjs/tasks/race-condition',
          sourceRoot: 'lessons/rxjs/tasks/race-condition/src',
          buildOptions: {
            tsConfig: 'lessons/rxjs/tasks/race-condition/tsconfig.cypress.json',
            main: 'lessons/rxjs/tasks/race-condition/src/main.ts',
            polyfills: ['zone.js'],
            index: 'lessons/rxjs/tasks/race-condition/src/index.html',
            assets: [],
            styles: [],
            scripts: [],
          },
        },
      },
    },
    supportFile: 'lessons/rxjs/tasks/race-condition/cypress/support/component.ts',
    indexHtmlFile:
      'lessons/rxjs/tasks/race-condition/cypress/support/component-index.html',
  },
});
