import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeBaseLinks from './src/plugins/rehype-base-links.mjs';

// Jedno źródło prawdy dla adresu bazowego — strona żyje w podkatalogu na GitHub Pages.
const BASE = '/Ryszard-Pawlowski';

export default defineConfig({
  site: 'https://mateuszpiaszczyk.github.io',
  base: BASE,
  markdown: {
    // Docleja BASE do linków/obrazów zapisanych w treści Markdown jako „/…".
    rehypePlugins: [[rehypeBaseLinks, { base: BASE }]],
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
