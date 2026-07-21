/**
 * rehype-base-links — docleja adres bazowy do ścieżek-korzeniowych w treści Markdown.
 *
 * Autorzy wpisów blogowych mogą pisać zwykłe linki i obrazy typu `/rekolekcje`,
 * `/kontakt`, a ten plugin przy budowie zamienia je na `/Ryszard-Pawlowski/…`,
 * żeby działały pod podkatalogiem (GitHub Pages). Dzięki temu treść pozostaje
 * czysta i przenośna — bazy nie wpisuje się ręcznie.
 *
 * Nie rusza: linków zewnętrznych (http:, //), kotwic (#…), adresów już z bazą.
 * Zależności zero — ręczny obchód drzewa HAST.
 *
 * @param {{ base?: string }} options — `base` z astro.config.mjs (np. „/Ryszard-Pawlowski").
 */
export default function rehypeBaseLinks({ base = '/' } = {}) {
  // Prefiks z pojedynczymi ukośnikami, np. „/Ryszard-Pawlowski/".
  const prefix = `/${base}/`.replace(/\/{2,}/g, '/');

  /** Atrybuty, w których mogą wystąpić ścieżki. */
  const attrs = ['href', 'src'];

  const shouldRewrite = (value) =>
    typeof value === 'string' &&
    value.startsWith('/') && // tylko ścieżki-korzeniowe
    !value.startsWith('//') && // nie protokołowo-względne
    !value.startsWith(prefix); // jeszcze bez bazy

  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      for (const attr of attrs) {
        const value = node.properties[attr];
        if (shouldRewrite(value)) {
          node.properties[attr] = `${prefix}${value}`.replace(/\/{2,}/g, '/');
        }
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };

  return (tree) => walk(tree);
}
