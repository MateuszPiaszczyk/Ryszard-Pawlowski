# 04 · Dostępność (WCAG) i SEO

## Część A — Dostępność (WCAG 2.2, poziom AA)

Projekt przygotowano z myślą o osobach z niepełnosprawnościami oraz zgodnie z
polską ustawą i standardem WCAG 2.2 AA.

### 1. Struktura i semantyka
- Poprawna hierarchia nagłówków (jeden `<h1>` na stronę, logiczne `h2/h3`).
- Znaczniki krajobrazu: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- Listy jako `<ul>/<ol>` (z `role="list"` tam, gdzie CSS usuwa punktory).
- Atrybut `lang="pl"` na `<html>` — poprawna wymowa w czytnikach ekranu.

### 2. Nawigacja klawiaturą
- **Skip link** („Przejdź do treści”) jako pierwszy element strony.
- Wszystkie elementy interaktywne osiągalne Tabem, w logicznej kolejności.
- Widoczny `:focus-visible` (kontrastowy pierścień) na wszystkich kontrolkach.
- Menu mobilne (natywny `<details>`) i lightbox (natywny `<dialog>`) —
  pełna obsługa klawiatury, `Escape` zamyka, focus pozostaje w oknie.

### 3. Formularze
- Każde pole ma powiązaną etykietę `<label for>`.
- Pola wymagane oznaczone wizualnie i atrybutem `required`.
- Walidacja z `:user-invalid` (błąd dopiero po interakcji, nie od razu).
- Komunikaty w regionach `aria-live="polite"`.
- Wymagana zgoda **RODO** przy kontakcie.

### 4. Obrazy i multimedia
- Sensowne teksty alternatywne `alt` dla obrazów niosących treść.
- Elementy czysto dekoracyjne oznaczone `aria-hidden`.
- Galeria: każde zdjęcie w przycisku z etykietą „Powiększ zdjęcie X z N”.

### 5. Kontrast i czytelność
- Barwy tekstu i tła dobrane pod kontrast ≥ 4,5:1 (tekst) / ≥ 3:1 (duży tekst, UI).
- Płynna, skalowalna typografia (`clamp`), jednostki względne — działa przy
  powiększeniu do 200% i przy `text-size-adjust`.
- Optymalna szerokość kolumny tekstu (`--measure`) dla komfortu czytania.

### 6. Ruch i preferencje użytkownika
- `@media (prefers-reduced-motion: reduce)` — wyłącza animacje i płynne
  przewijanie dla osób wrażliwych na ruch.
- `@media (prefers-color-scheme)` — automatyczny tryb jasny/ciemny + ręczny
  przełącznik (zapamiętywany).
- `color-scheme` ustawione dla natywnych kontrolek.

### 7. Cele dotykowe
- Przyciski i ikony ≥ 44×44 px (wymóg WCAG 2.2 „Target Size”).

> **Rekomendacja:** przy publikacji dodać stronę „Deklaracja dostępności”
> (wymagana dla podmiotów publicznych; dobra praktyka dla pozostałych).

---

## Część B — SEO

### 1. Meta dane (na każdej stronie)
- Unikalny `<title>` i `meta description` per strona.
- `<link rel="canonical">` — zapobiega duplikacji treści.
- `robots`: `index, follow, max-image-preview:large` (dla 404: `noindex`).

### 2. Open Graph i Twitter Cards
Pełny zestaw dla poprawnego podglądu w mediach społecznościowych i komunikatorach:
```
og:type, og:site_name, og:locale, og:title, og:description, og:url,
og:image (+secure_url, type, width=1200, height=630, alt),
twitter:card=summary_large_image, twitter:title/description/image/alt
```
Obraz OG: `public/og/og-image.jpg` (1200×630).

### 3. Dane strukturalne (JSON-LD, schema.org)
Obecne na stronach:
- **WebSite** i **Person** (ks. Ryszard Pawłowski) — globalnie.
- **BreadcrumbList** — na podstronach (ścieżka nawigacji w wynikach wyszukiwania).
- **BlogPosting** — na wpisach bloga.

### 4. Wydajność (Core Web Vitals)
Czynniki wpływające na ranking i UX:
- Statyczny HTML + krytyczny CSS inline → szybki **LCP**.
- Obrazy AVIF/WebP z `width`/`height` (brak przeskoków) → dobry **CLS**.
- Minimalny JS → niski **INP/TBT**.
- Obraz „hero” ładowany z `fetchpriority="high"`, pozostałe `loading="lazy"`.

### 5. Indeksowalność
- `sitemap-index.xml` generowany automatycznie.
- `robots.txt` wskazuje sitemap; blokuje jedynie zasoby techniczne `/_astro/`.
- Czyste, czytelne adresy URL (`/rekolekcje`, `/blog/o-szkole-w-manreza`).

### 6. Lokalizacja i język
- `lang="pl"`, `og:locale=pl_PL`, treść w pełni polska.
- Struktura gotowa do rozszerzenia o wersje językowe (np. `/it`, `/en`).

### Checklista SEO po wdrożeniu
- [ ] Google Search Console — dodać własność i przesłać sitemap.
- [ ] Zweryfikować podgląd OG (debugger Facebook/LinkedIn).
- [ ] Ustawić 301 `www` ↔ domena główna, wymusić HTTPS.
- [ ] (Opcjonalnie) Google Analytics / analityka zgodna z RODO (np. Plausible).
- [ ] (Opcjonalnie) `LocalBusiness`/`Event` — jeśli pojawią się terminy rekolekcji.
