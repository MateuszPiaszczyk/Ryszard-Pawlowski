/**
 * Pomocniki ścieżek świadome adresu bazowego (`import.meta.env.BASE_URL`).
 *
 * Strona bywa serwowana w podkatalogu (np. GitHub Pages: `/Ryszard-Pawlowski/`),
 * dlatego KAŻDĄ ścieżkę bezwzględną (zaczynającą się od „/") do podstrony lub
 * zasobu z `public/` trzeba poprzedzić bazą. Obrazów importowanych przez
 * `astro:assets` NIE dotyczy — tam Astro docleja bazę samo.
 *
 * Baza jest jednym źródłem prawdy: `base` w `astro.config.mjs`.
 */

/** Odnośnik zewnętrzny lub specjalny (http:, mailto:, tel:, //, #) — takich nie ruszamy. */
const isExternal = (path: string): boolean => /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path);

/** Adres bazowy z gwarantowanym ukośnikiem końcowym, np. „/Ryszard-Pawlowski/". */
const BASE: string = import.meta.env.BASE_URL || '/';

/**
 * Docleja bazę do ścieżki-korzeniowej: `withBase('/o-mnie')` → `/Ryszard-Pawlowski/o-mnie`.
 * Zabezpiecza przed podwójnymi ukośnikami („//"). Linki zewnętrzne i kotwice („#…")
 * zwraca bez zmian.
 */
export function withBase(path: string = '/'): string {
  if (isExternal(path)) return path;
  return `/${BASE}/${path}`.replace(/\/{2,}/g, '/');
}

/** Usuwa wiodącą bazę ze ścieżki (odwrotność `withBase`) — normalizuje wejście z `Astro.url`. */
export function stripBase(path: string): string {
  const base = BASE.replace(/\/+$/, ''); // „/Ryszard-Pawlowski"
  if (base && (path === base || path.startsWith(base + '/'))) {
    return path.slice(base.length) || '/';
  }
  return path;
}

/**
 * Buduje pełny, bezwzględny URL (origin + baza + ścieżka) — do `canonical`, Open Graph
 * i danych strukturalnych JSON-LD. Origin pochodzi z pola `site` w `astro.config.mjs`
 * (dostępne jako `import.meta.env.SITE`).
 */
export function absoluteUrl(path: string = '/'): string {
  const origin = import.meta.env.SITE ?? 'https://mateuszpiaszczyk.github.io';
  return new URL(withBase(stripBase(path)), origin).href;
}
