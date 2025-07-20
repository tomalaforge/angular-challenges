import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';

export const locales = {
  root: {
    label: 'English',
    lang: 'en'
  },
  es: {
    label: 'Español',
    lang: 'es'
  },
  fr: {
    label: 'Français',
    lang: 'fr'
  },
  pt: {
    label: 'Português',
    lang: 'pt'
  },
  ru: {
    label: 'Русский',
    lang: 'ru'
  },
  'zh-cn': {
    label: '简体中文',
    lang: 'zh-CN'
  }
};


// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Angular Challenges',
    logo: {
      src: './public/angular-challenge.webp',
      alt: 'angular challenges logo'
    },
    favicon: './angular-challenge.ico',
    social: {
      github: 'https://github.com/tomalaforge/angular-challenges',
      linkedin: 'https://www.linkedin.com/in/thomas-laforge-2b05a945/',
      twitter: 'https://twitter.com/laforge_toma'
    },
    customCss: ['./src/styles/custom-css.css'],
    sidebar: [{
      label: 'Guides',
      autogenerate: {
        directory: 'guides'
      },
      translations: {
        es: 'Guías',
        fr: 'Guides',
        pt: 'Guias',
        ru: 'Руководство',
        'zh-CN': '指南'
      }
    },
      {
      label: 'Leaderboard',
      autogenerate: {
        directory: 'leaderboard',
        collapsed: true
      },
      translations: {
        es: 'Leaderboard',
        fr: 'Leaderboard',
        pt: 'Tabela de Classificação',
        ru: 'Leaderboard',
        'zh-CN': '排行榜'
      }
    },
    {
      label: 'Challenges',
      autogenerate: {
        directory: 'challenges'
      },
      translations: {
        es: 'Desafíos',
        fr: 'Challenges',
        pt: 'Desafios',
        ru: 'Задачи',
        'zh-CN': '挑战'
      }
    }],
    head: [{
      tag: 'script',
      attrs: {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-6BXJ62W6G5',
        async: true
      }
    }, {
      tag: 'script',
      content: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6BXJ62W6G5');
          `
    }, {
      tag: 'script',
      attrs: {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2438923752868254',
        async: true
      }
    }],
    components: {
      MarkdownContent: './src/components/Content.astro',
      TableOfContents: './src/components/TableOfContents.astro',
      PageTitle: './src/components/PageTitle.astro',
      MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      SiteTitle: './src/components/SiteTitle.astro',
      Hero: './src/components/Hero.astro'
    },
    defaultLocale: 'root',
    locales
  }), svelte()],
  output: "hybrid",
  adapter: vercel()
});
