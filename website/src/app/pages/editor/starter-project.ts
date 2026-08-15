import type { FileSystemTree } from '@webcontainer/api';
import { ChallengeStarter } from '../../doc.model';

/**
 * Synthesizes a standalone Angular CLI project for a challenge so it can run
 * inside a WebContainer: the (possibly edited) starter sources plus a minimal
 * package.json / angular.json / tsconfig set and a jest or vitest harness.
 */
export function buildProjectTree(
  starter: ChallengeStarter,
  contents: ReadonlyMap<string, string>,
): FileSystemTree {
  const tree: FileSystemTree = {};
  const paths = new Set(starter.files.map((f) => f.path));

  const write = (path: string, content: string | Uint8Array) => {
    const segments = path.split('/');
    let node = tree;
    for (const segment of segments.slice(0, -1)) {
      const dir = (node[segment] ??= { directory: {} }) as { directory: FileSystemTree };
      node = dir.directory;
    }
    node[segments[segments.length - 1]] = { file: { contents: content } };
  };

  for (const file of starter.files) {
    if (file.base64) {
      write(
        file.path,
        Uint8Array.from(atob(file.content), (c) => c.charCodeAt(0)),
      );
      continue;
    }
    let content = contents.get(file.path) ?? file.content;
    if (file.path === 'src/index.html') {
      // Challenge apps are styled with Tailwind; the browser build keeps the
      // preview faithful without a PostCSS pipeline.
      content = content.replace(
        '</head>',
        '  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>\n</head>',
      );
    }
    if (file.path === 'src/styles.css') {
      // No PostCSS pipeline in the synthesized project — Tailwind comes from
      // the browser build injected into index.html instead.
      content = content.replace(/^\s*@import\s+['"]tailwindcss['"];?\s*$/gm, '');
    }
    if (file.path === 'src/test-setup.ts' && starter.runner === 'vitest') {
      // Vitest browser mode needs a real Playwright browser — not available
      // in a WebContainer, so tests run in jsdom instead.
      content = content.replace('browserMode: true', 'browserMode: false');
    }
    write(file.path, content);
  }

  if (starter.hasTests && !paths.has('src/test-setup.ts')) {
    write(
      'src/test-setup.ts',
      starter.runner === 'vitest'
        ? `import '@angular/compiler';\n`
        : `import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';\n\nsetupZoneTestEnv();\n`,
    );
  }

  write('package.json', packageJson(starter));
  write(
    'angular.json',
    angularJson(
      paths,
      [...paths].some((p) => p.startsWith('src/assets/')),
    ),
  );
  write('tsconfig.json', TSCONFIG);
  write('tsconfig.app.json', TSCONFIG_APP);
  if (starter.hasTests) {
    if (starter.runner === 'jest') {
      write('tsconfig.spec.json', TSCONFIG_SPEC_JEST);
      write('jest.config.cjs', JEST_CONFIG);
    } else {
      write('tsconfig.spec.json', TSCONFIG_SPEC_VITEST);
      write('vitest.config.mts', VITEST_CONFIG);
    }
  }
  return tree;
}

function packageJson(starter: ChallengeStarter): string {
  return JSON.stringify(
    {
      name: 'angular-challenge',
      private: true,
      scripts: {
        start: 'ng serve --host 0.0.0.0 --port 4200',
        test: starter.runner === 'vitest' ? 'vitest run' : 'jest --colors=false',
      },
      dependencies: starter.dependencies,
      devDependencies: starter.devDependencies,
    },
    null,
    2,
  );
}

function angularJson(paths: ReadonlySet<string>, hasAssets: boolean): string {
  return JSON.stringify(
    {
      $schema: './node_modules/@angular/cli/lib/config/schema.json',
      version: 1,
      projects: {
        app: {
          projectType: 'application',
          root: '',
          sourceRoot: 'src',
          architect: {
            build: {
              builder: '@angular/build:application',
              options: {
                outputPath: 'dist',
                index: 'src/index.html',
                browser: 'src/main.ts',
                polyfills: ['zone.js'],
                tsConfig: 'tsconfig.app.json',
                styles: paths.has('src/styles.css') ? ['src/styles.css'] : [],
                assets: hasAssets ? [{ glob: '**/*', input: 'src/assets', output: 'assets' }] : [],
              },
            },
            serve: {
              builder: '@angular/build:dev-server',
              options: { buildTarget: 'app:build' },
            },
          },
        },
      },
    },
    null,
    2,
  );
}

const TSCONFIG = JSON.stringify(
  {
    compileOnSave: false,
    compilerOptions: {
      strict: true,
      noImplicitOverride: true,
      noPropertyAccessFromIndexSignature: false,
      noImplicitReturns: true,
      skipLibCheck: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      moduleResolution: 'bundler',
      importHelpers: true,
      isolatedModules: true,
      target: 'ES2022',
      module: 'preserve',
      lib: ['ES2022', 'dom'],
      useDefineForClassFields: false,
    },
    angularCompilerOptions: {
      enableI18nLegacyMessageIdFormat: false,
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true,
    },
  },
  null,
  2,
);

const TSCONFIG_APP = JSON.stringify(
  {
    extends: './tsconfig.json',
    compilerOptions: { types: [] },
    files: ['src/main.ts'],
    include: ['src/**/*.d.ts'],
    exclude: ['src/**/*.spec.ts', 'src/test-setup.ts'],
  },
  null,
  2,
);

const TSCONFIG_SPEC_JEST = JSON.stringify(
  {
    extends: './tsconfig.json',
    compilerOptions: {
      module: 'commonjs',
      moduleResolution: 'node',
      target: 'ES2022',
      types: ['jest'],
    },
    include: ['src/**/*.spec.ts', 'src/**/*.d.ts', 'src/test-setup.ts'],
  },
  null,
  2,
);

const TSCONFIG_SPEC_VITEST = JSON.stringify(
  {
    extends: './tsconfig.json',
    compilerOptions: { types: ['vitest/globals'] },
    include: ['src/**/*.spec.ts', 'src/**/*.d.ts', 'src/test-setup.ts'],
  },
  null,
  2,
);

const JEST_CONFIG = `module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  transform: {
    '^.+\\\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\\\.mjs$)'],
};
`;

const VITEST_CONFIG = `import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
  },
}));
`;
