const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/module-to-standalone/**/*.{ts,html}',
    'libs/module-to-standalone/**/*.{ts,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
