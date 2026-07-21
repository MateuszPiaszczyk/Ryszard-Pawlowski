import type { APIRoute } from 'astro';
import { withBase } from '../utils/base';

/**
 * Manifest PWA generowany dynamicznie, aby `start_url`, `scope` i ścieżki ikon
 * uwzględniały adres bazowy (`import.meta.env.BASE_URL`). Statyczny plik z `public/`
 * nie potrafiłby tego zrobić — pod podkatalogiem (GitHub Pages) miałby błędne ścieżki.
 * Wynik: `${base}/site.webmanifest`.
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: 'Ks. Ryszard Pawłowski — Rekolekcje ignacjańskie',
    short_name: 'Ks. R. Pawłowski',
    description: 'Rekolekcje ignacjańskie, medytacja Słowa Bożego i towarzyszenie duchowe.',
    lang: 'pl',
    dir: 'ltr',
    start_url: withBase('/'),
    scope: withBase('/'),
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#faf8f3',
    theme_color: '#12202c',
    categories: ['lifestyle', 'education', 'religion'],
    icons: [
      { src: withBase('/favicon.svg'), sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: withBase('/icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: withBase('/icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: withBase('/icons/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
