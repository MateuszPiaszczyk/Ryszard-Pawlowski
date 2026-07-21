# Ks. Ryszard Pawłowski — Rekolekcje ignacjańskie

Nowoczesna, responsywna (mobile-first) i dostępna strona internetowa poświęcona
rekolekcjom ignacjańskim ks. Ryszarda Pawłowskiego. Projekt zbudowany od podstaw
w oparciu o framework **Astro**, z myślą o wydajności, dostępności (WCAG 2.2 AA)
oraz zgodności z aktualnymi standardami SEO (Open Graph, dane strukturalne).

> **Projekt i realizacja:** [Piaszczyk Studio](https://piaszczykstudio.pl/)

---

## 🚀 Szybki start

```bash
# 1. Instalacja zależności (Node.js ≥ 20.3)
npm install

# 2. Serwer deweloperski (http://localhost:4321)
npm run dev

# 3. Budowa wersji produkcyjnej → katalog dist/
npm run build

# 4. Podgląd wersji produkcyjnej
npm run preview
```

| Polecenie          | Działanie                                                        |
| ------------------ | ---------------------------------------------------------------- |
| `npm run dev`      | Start serwera deweloperskiego z hot-reload                       |
| `npm run build`    | Generuje statyczną stronę do `dist/` (uruchamia też `icons`)     |
| `npm run preview`  | Lokalny podgląd zbudowanej strony                                |
| `npm run check`    | Sprawdzenie typów i poprawności plików `.astro`                  |
| `npm run icons`    | Generuje ikony PWA/favicon z `public/favicon.svg`                |

---

## 🧱 Stos technologiczny

- **[Astro 5](https://astro.build)** — generator stron statycznych (SSG), zero JS
  domyślnie, wysoka wydajność.
- **TypeScript** — bezpieczeństwo typów w danych i komponentach.
- **Nowoczesny CSS** — custom properties (tokeny), CSS Grid, `clamp()` (płynna
  typografia), `color-mix()`, tryb ciemny, `prefers-reduced-motion`.
- **Self-hosted fonts** (`@fontsource`) — brak zapytań do zewnętrznych serwerów
  (zgodność z RODO), lepsza wydajność.
- **`astro:assets`** — automatyczna optymalizacja obrazów (AVIF/WebP, responsywne
  rozmiary, lazy-loading).
- **`@astrojs/sitemap`** — automatyczny `sitemap-index.xml`.

Brak zależności runtime po stronie klienta poza minimalnym, waniliowym JS
(menu mobilne, tryb ciemny, lightbox galerii, formularze).

---

## 📁 Struktura projektu

```
ryszardpawlowski.eu/
├── public/                 # pliki statyczne serwowane 1:1
│   ├── favicon.svg
│   ├── icons/              # ikony PWA (generowane)
│   ├── og/og-image.jpg     # obraz Open Graph 1200×630
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   └── generate-icons.mjs  # generowanie ikon z favicona
├── src/
│   ├── assets/images/      # obrazy optymalizowane przez Astro
│   │   ├── hero/  gallery/  books/  content/  brand/
│   ├── components/         # komponenty UI (.astro)
│   ├── content/blog/       # wpisy blogowe (Markdown)
│   ├── content.config.ts   # schemat kolekcji treści
│   ├── data/               # dane serwisu (nawigacja, teksty, linki)
│   ├── layouts/            # szablon bazowy strony
│   ├── pages/              # trasy (routing plikowy)
│   └── styles/             # system projektowy (tokeny, reset, baza, utils)
├── docs/                   # dokumentacja projektu i oferta
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Pełny opis: [`docs/02-architektura-projektu.md`](docs/02-architektura-projektu.md).

---

## 📚 Dokumentacja

| Dokument | Zawartość |
| -------- | --------- |
| [`docs/01-analiza-microweber.md`](docs/01-analiza-microweber.md) | Analiza oryginalnej strony (Microweber) |
| [`docs/02-architektura-projektu.md`](docs/02-architektura-projektu.md) | Architektura i struktura nowego projektu |
| [`docs/03-dokumentacja-techniczna.md`](docs/03-dokumentacja-techniczna.md) | Dokumentacja techniczna, komponenty, wdrożenie |
| [`docs/04-dostepnosc-i-seo.md`](docs/04-dostepnosc-i-seo.md) | Dostępność (WCAG) i SEO |
| [`docs/05-przewodnik-edycji-tresci.md`](docs/05-przewodnik-edycji-tresci.md) | Przewodnik edycji treści dla właściciela |
| [`docs/06-oferta-i-kosztorys.md`](docs/06-oferta-i-kosztorys.md) | Oferta handlowa i kosztorys |
| [`docs/07-instrukcja-instalacji-i-wdrozenia.md`](docs/07-instrukcja-instalacji-i-wdrozenia.md) | Instalacja i wdrożenie krok po kroku (klasyczny hosting + GitHub) |

---

## 🌐 Wdrożenie

Strona jest w pełni statyczna — katalog `dist/` można wdrożyć na dowolnym hostingu
lub CDN: **Netlify, Cloudflare Pages, Vercel, GitHub Pages** albo klasyczny hosting
FTP. Pełna instrukcja krok po kroku (klasyczny hosting + GitHub, z gotowym
`.htaccess` i workflow CI/CD): [`docs/07-instrukcja-instalacji-i-wdrozenia.md`](docs/07-instrukcja-instalacji-i-wdrozenia.md).

## ✅ Elementy do integracji (oznaczone na stronie)

- Formularz kontaktowy / zapisu (obecnie tryb demo → `mailto:`; gotowe pod
  Formspree / Web3Forms / własny endpoint).
- Zapis do biuletynu (gotowe pod MailerLite / Mailchimp / Brevo).
- Odtwarzacz „Modlitwa w drodze” (miejsce na osadzenie audio/podcastu).
- Terminy i cennik rekolekcji (sekcja przykładowa do uzupełnienia).

---

© 2026 Ryszard Pawłowski Rekolekcje · Projekt i realizacja: **Piaszczyk Studio**
# Ryszard-Pawlowski
