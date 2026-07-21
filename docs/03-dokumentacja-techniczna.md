# 03 · Dokumentacja techniczna

## 1. Wymagania

- **Node.js ≥ 20.3** (zalecane 22 LTS — patrz `.nvmrc`)
- **npm** (dołączony do Node.js)

## 2. Instalacja i praca lokalna

```bash
npm install        # instalacja zależności
npm run dev        # serwer deweloperski → http://localhost:4321
npm run build      # budowa produkcyjna → dist/
npm run preview    # podgląd wersji produkcyjnej
npm run check      # walidacja typów / plików .astro
```

---

## 3. Konfiguracja

### `astro.config.mjs`
- `site` — kanoniczny adres (`https://ryszardpawlowski.eu`); używany przez SEO i sitemap.
- `@astrojs/sitemap` — automatyczna generacja mapy strony.
- `image.responsiveStyles` — responsywne obrazy.
- `build.inlineStylesheets: 'auto'` — krytyczny CSS inline dla lepszego LCP.
- `prefetch` — wstępne pobieranie stron przy najechaniu (szybsza nawigacja).

### `src/data/site.ts` — centralna konfiguracja
Najczęściej edytowany plik: nazwa, opis, adres, dane kontaktowe, linki społeczne,
domyślny obraz OG, informacja o autorze (Piaszczyk Studio).

---

## 4. System projektowy (CSS)

### Tokeny — `src/styles/tokens.css`
Zmienne CSS pogrupowane w:
- **Kolory bazowe** — pergamin, atrament, złoto, granat (skale numeryczne).
- **Tokeny semantyczne** — `--color-bg`, `--color-text`, `--color-primary`,
  `--color-deep` itd. To ich używają komponenty.
- **Typografia** — rodziny fontów, płynna skala `--step--2 … --step-6` (`clamp()`).
- **Odstępy** — płynna skala `--space-3xs … --space-3xl`.
- **Promienie, cienie, animacje, układ** (kontenery, z-index).

Tryb ciemny nadpisuje tokeny semantyczne w dwóch miejscach:
`@media (prefers-color-scheme: dark)` (automatyczny) oraz
`:root[data-theme='dark']` (ręczne przełączenie).

### Paleta i typografia
- **Kolory:** pergamin `#faf8f3`, atrament `#241f18`, złoto liturgiczne `#9c6f27`,
  granat ciszy `#0f1c26`.
- **Fonty:** nagłówki — *Cormorant Garamond* (serif); tekst/UI — *Inter*
  (self-hosted przez `@fontsource`).

### Klasy narzędziowe — `src/styles/utilities.css`
`.container`, `.section`, `.flow`, `.cluster`, `.auto-grid`, `.grid-2/3/4`,
`.split`, `.card`, `.pill`, `.reveal` (animacja wejścia z poszanowaniem
`prefers-reduced-motion`), `.placeholder-note` (widoczne oznaczenie sekcji do
uzupełnienia).

---

## 5. Kluczowe komponenty

| Komponent | Odpowiedzialność | Uwagi dot. dostępności |
| --------- | ---------------- | ---------------------- |
| `BaseLayout` | `<html>`, `<head>`, SEO, motyw, header/footer, skip-link | Skrypt anty-FOUC przed renderem; `lang="pl"` |
| `Seo` | title, description, canonical, OG, Twitter, JSON-LD | Parametr `noindex` dla 404 |
| `Header` | Nawigacja, menu mobilne, przełącznik motywu | Menu = natywny `<details>`; `aria-current`, Escape/klik poza zamyka |
| `Footer` | Kontakt, biuletyn, kredyt studia | `aria-label` nawigacji, `aria-live` komunikatów |
| `Gallery` | Siatka + lightbox | Natywny `<dialog>` (focus-trap, Escape), strzałki klawiaturą |
| `ContactForm` | Formularz kontaktu/zapisu | `<label>` dla każdego pola, `:user-invalid`, zgoda RODO, `aria-live` |
| `Icon` | Ikony SVG inline | `aria-hidden` domyślnie; `title` → `role="img"` |
| `PageHero` / `Breadcrumbs` | Nagłówek podstrony + ścieżka | `aria-label`, `aria-current="page"` |

### Zachowania JavaScript (waniliowy, minimalny)
- **Przełącznik motywu** — zapis w `localStorage`, aktualizacja `theme-color`.
- **Menu mobilne** — ulepszenie natywnego `<details>` (Escape, klik poza, blokada scrolla).
- **Lightbox** — otwiera `<dialog>`, nawigacja strzałkami, klik w tło zamyka.
- **Scroll-spy** (Rekolekcje) — `IntersectionObserver` podświetla spis treści.
- **Formularze** — walidacja HTML5 + fallback `mailto:` (gotowe pod integrację).

---

## 6. Treść — jak działa blog

Kolekcja `blog` (Astro Content Layer) ładuje pliki `.md` z `src/content/blog/`.
Schemat (walidacja Zod) w `src/content.config.ts`:

```yaml
---
title: Tytuł wpisu
description: Krótki opis (używany też w SEO/OG)
pubDate: 2024-09-27
category: Świadectwa
tags: [duchowość, milczenie]
draft: false        # true = wpis widoczny tylko w trybie dev
---
Treść w Markdown…
```

Dodanie pliku `.md` = nowy wpis (adres `/blog/<nazwa-pliku>`), automatycznie
z danymi strukturalnymi `BlogPosting` i wpisem w sitemap.

---

## 7. Obrazy

- Umieszczaj w `src/assets/images/…` i importuj — Astro wygeneruje AVIF/WebP oraz
  `srcset`. Galeria ładowana zbiorczo przez `import.meta.glob`.
- Obraz OG (`public/og/og-image.jpg`) to plik statyczny 1200×630 (stały adres
  wymagany przez social media).
- Waga po optymalizacji spada zwykle o 60–95% względem oryginału.

---

## 8. Wdrożenie produkcyjne

> **Pełna instrukcja krok po kroku** (klasyczny hosting + GitHub, z gotowym
> plikiem `.htaccess`, konfiguracją nginx i workflow CI/CD): zob.
> [`07-instrukcja-instalacji-i-wdrozenia.md`](07-instrukcja-instalacji-i-wdrozenia.md).
> Poniżej skrót.

Wynik `dist/` to statyczne pliki. Rekomendowane opcje:

### A. Netlify / Cloudflare Pages / Vercel (zalecane)
1. Podłącz repozytorium Git.
2. Build command: `npm run build` · Publish directory: `dist`.
3. Automatyczny deploy przy każdym `push`, darmowy HTTPS i CDN.

### B. Klasyczny hosting (FTP)
1. `npm run build` lokalnie.
2. Wgraj **zawartość** katalogu `dist/` do katalogu WWW (np. `public_html`).
3. Upewnij się, że serwer serwuje `404.html` dla nieznanych adresów.

### Po wdrożeniu (checklista)
- [ ] Zgłoś `sitemap-index.xml` w Google Search Console.
- [ ] Podłącz formularz (Formspree / Web3Forms) i biuletyn (MailerLite/Brevo).
- [ ] Zweryfikuj podgląd OG (np. przez debugger social media).
- [ ] Ustaw przekierowanie 301 z `www` na domenę główną (lub odwrotnie).

---

## 9. Utrzymanie i aktualizacje

- **Aktualizacja zależności:** `npm outdated` → `npm update`.
- **Kopie zapasowe:** repozytorium Git jest kompletną kopią (bez `node_modules`).
- **Wydajność:** obrazy zawsze przez `astro:assets`; unikać ciężkich skryptów.
