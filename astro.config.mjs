// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Kanoniczny adres produkcyjny — używany przez SEO (OG, canonical) i sitemap.
export const SITE_URL = 'https://ryszardpawlowski.eu';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    // Wstrzykuje krytyczny CSS inline, resztę ładuje jako pliki — lepszy LCP.
    inlineStylesheets: 'auto',
  },
  image: {
    // Domyślny serwis obrazów (sharp) generuje AVIF/WebP i responsywne rozmiary.
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
