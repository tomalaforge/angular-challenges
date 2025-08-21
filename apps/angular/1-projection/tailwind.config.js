const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light-red': 'rgba(250, 0, 0, 0.1)',
        'light-green': 'rgba(0, 250, 0, 0.1)',
        'light-blue': 'rgba(0, 0, 250, 0.1)',
      },
      colors: {
        'light-red': 'rgba(250, 0, 0, 0.1)',
        'light-green': 'rgba(0, 250, 0, 0.1)',
        'light-blue': 'rgba(0, 0, 250, 0.1)',
      }
    },
  },
  plugins: [],
};
