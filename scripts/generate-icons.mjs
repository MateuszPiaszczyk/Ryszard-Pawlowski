/**
 * Generuje ikony PWA/favicon (PNG) z pliku public/favicon.svg.
 * Uruchamiane automatycznie przed każdym buildem (npm run prebuild),
 * korzysta z biblioteki sharp dostarczanej razem z Astro.
 *
 *   node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const svgPath = resolve(root, 'public/favicon.svg');
const outDir = resolve(root, 'public/icons');
const DEEP = '#12202c';

const svg = await readFile(svgPath);
await mkdir(outDir, { recursive: true });

const transparent = (size) =>
  sharp(svg, { density: 512 }).resize(size, size, { fit: 'contain' }).png();

async function onDeep(canvas, inner, out) {
  const buf = await sharp(svg, { density: 512 }).resize(inner, inner).png().toBuffer();
  await sharp({
    create: { width: canvas, height: canvas, channels: 4, background: DEEP },
  })
    .composite([{ input: buf, gravity: 'center' }])
    .png()
    .toFile(resolve(outDir, out));
}

await transparent(32).toFile(resolve(outDir, 'icon-32.png'));
await transparent(192).toFile(resolve(outDir, 'icon-192.png'));
await transparent(512).toFile(resolve(outDir, 'icon-512.png'));
// Ikona „maskable" — treść w bezpiecznej strefie (~70%) na pełnym tle.
await onDeep(512, 340, 'icon-maskable-512.png');
// Apple touch icon — pełne tło (brak przezroczystości).
await onDeep(180, 150, 'apple-touch-icon.png');

console.log('✓ Wygenerowano ikony w public/icons/');
