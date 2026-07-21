import { defineConfig } from 'astro/config';
import sitemap from '@astro/sitemap';

const SITE_URL = 'https://ryszardpawlowski.eu';

// Sprawdzamy czy budujemy projekt pod GitHub Pages (możesz też po prostu wpisać base: '/Ryszard-Pawlowski')
const isGitHubPages = process.env.GITHUB_ACTIONS === true || process.env.NODE_ENV === 'production';

export default defineConfig({
  site: SITE_URL,
  // Jeśli to GitHub Pages, dodajemy ścieżkę repozytorium jako base
  base: '/Ryszard-Pawlowski',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date('2026-07-18'),
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
