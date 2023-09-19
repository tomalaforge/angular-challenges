import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Angular Challenges',
      logo: {
        src: './public/angular-challenge.webp',
        alt: 'angular challenges logo',
      },
      favicon: './public/angular-challenge.ico',
      social: {
        github: 'https://github.com/withastro/starlight',
        linkedin: 'https://www.linkedin.com/in/thomas-laforge-2b05a945/',
        twitter: 'https://twitter.com/laforge_toma',
      },
      customCss: [
        '@fontsource/ibm-plex-serif/400.css',
        '@fontsource/ibm-plex-serif/600.css',
        './src/styles/custom-css.css',
      ],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Challenges',
          autogenerate: { directory: 'challenges' },
          // items: [
          //   {
          //     label: 'Angular',
          //     items: [
          //       {
          //         label: 'Projection',
          //         link: '/challenges/angular/projection',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Directive enhancement',
          //         link: '/challenges/angular/directive-enhancement',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'ContextOutlet Typing',
          //         link: '/challenges/angular/context-outlet-typing',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //       {
          //         label: 'CRUD',
          //         link: '/challenges/angular/crud',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Permissions',
          //         link: '/challenges/angular/permissions',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Simple Pure Pipe',
          //         link: '/challenges/angular/pipe-pure',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'WrapFn Pipe',
          //         link: '/challenges/angular/pipe-wrapFn',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Utility Pipe',
          //         link: '/challenges/angular/pipe-utility',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //       {
          //         label: 'Change Dectection - scroll',
          //         link: '/challenges/angular/scroll-cd',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Styling',
          //         link: '/challenges/angular/styling',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Dependancy Injection',
          //         link: '/challenges/angular/di',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //       {
          //         label: 'Anchor Scrolling',
          //         link: '/challenges/angular/anchor-scrolling',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Router Input',
          //         link: '/challenges/angular/router-input',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Interop Rxjs Signal',
          //         link: '/challenges/angular/interop-rxjs-signal',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //       {
          //         label: 'Module to Standalone',
          //         link: '/challenges/angular/modaule-to-standalone',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Bug - Change Detection',
          //         link: '/challenges/angular/bug-cd',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: "Component's Decoupling",
          //         link: '/challenges/angular/decoupling',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'Angular - Performance',
          //     items: [
          //       {
          //         label: 'Default vs OnPush',
          //         link: '/challenges/angular-performance/default-onpush',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'Testing',
          //     items: [
          //       {
          //         label: 'Router',
          //         link: '/challenges/testing/router',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Nested Component',
          //         link: '/challenges/testing/nested-comp',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Input Output',
          //         link: '/challenges/testing/input-output',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Modal',
          //         link: '/challenges/testing/modal',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'harness',
          //         link: '/challenges/testing/harness',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Harness Creation',
          //         link: '/challenges/testing/harness-creation',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Checkbox',
          //         link: '/challenges/testing/checkbox',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //       {
          //         label: 'Reallife Application',
          //         link: '/challenges/testing/real-application',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'RxJs',
          //     items: [
          //       {
          //         label: 'Bug - Chaining Operators',
          //         link: '/challenges/rxjs/bug-chaining-operator',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Race Condition',
          //         link: '/challenges/rxjs/race-condition',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'Nx',
          //     items: [
          //       {
          //         label: 'Extending Library Generator',
          //         link: '/challenges/nx/generator-lib-ext',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //       {
          //         label: 'Component Generator',
          //         link: '/challenges/nx/generator-comp',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Custom Eslint Rule',
          //         link: '/challenges/nx/forbid-enum-rule',
          //         badge: {
          //           text: 'E',
          //           variant: 'success',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'NgRx',
          //     items: [
          //       {
          //         label: 'Effect vs Selector',
          //         link: '/challenges/ngrx/effect-selector',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //       {
          //         label: 'Power of Effects',
          //         link: '/challenges/ngrx/power-effect',
          //         badge: {
          //           text: 'H',
          //           variant: 'danger',
          //         },
          //       },
          //     ],
          //   },
          //   {
          //     label: 'Typescript',
          //     items: [
          //       {
          //         label: 'Function Overload',
          //         link: '/challenges/typescript/overload-fn',
          //         badge: {
          //           text: 'M',
          //           variant: 'caution',
          //         },
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    }),
  ],
});
