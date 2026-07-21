# 02 · Architektura i struktura projektu

## 1. Wybór technologii

| Kryterium | Dlaczego Astro |
| --------- | -------------- |
| **Wydajność** | Domyślnie 0 kB JavaScriptu; strona to wygenerowany statyczny HTML |
| **SEO** | Pełna kontrola nad `<head>`, czysta semantyka HTML, statyczne strony = szybka indeksacja |
| **Obrazy** | Wbudowana optymalizacja (`astro:assets`) → AVIF/WebP, `srcset`, lazy-loading |
| **Utrzymanie** | Komponenty + dane w jednym miejscu; treść bloga w Markdown |
| **Hosting** | Wynik to statyczne pliki — działa wszędzie, także na tanim hostingu |
| **Bezpieczeństwo** | Brak backendu/bazy = minimalna powierzchnia ataku |

Alternatywy rozważane: pozostanie przy Microweber (odrzucone — narzut, ograniczenia),
Next.js/React (odrzucone — nadmiarowe dla strony contentowej, trudniejszy hosting).

---

## 2. Pełna struktura katalogów

```
ryszardpawlowski.eu/
│
├── public/                      # serwowane bez przetwarzania (ścieżki 1:1)
│   ├── favicon.svg              # wektorowy favicon (monogram + płomień)
│   ├── icons/                   # ikony PWA (icon-32/192/512, maskable, apple-touch)
│   ├── og/
│   │   └── og-image.jpg         # domyślny obraz Open Graph 1200×630
│   ├── robots.txt
│   └── site.webmanifest         # manifest PWA
│
├── scripts/
│   └── generate-icons.mjs       # generuje ikony PNG z favicon.svg (sharp)
│
├── src/
│   ├── assets/
│   │   └── images/              # obrazy przetwarzane przez Astro (optymalizacja)
│   │       ├── hero/            # portret / zdjęcia nagłówkowe
│   │       ├── gallery/         # galeria (57 zdjęć)
│   │       ├── books/           # okładki / lektury
│   │       ├── content/         # zdjęcia sekcji
│   │       └── brand/           # elementy marki
│   │
│   ├── components/              # komponenty interfejsu
│   │   ├── Header.astro         # nagłówek + nawigacja + menu mobilne + tryb ciemny
│   │   ├── Footer.astro         # stopka + kontakt + newsletter + kredyt studia
│   │   ├── Seo.astro            # meta / OG / Twitter / JSON-LD
│   │   ├── PageHero.astro       # nagłówek podstron (breadcrumbs + tytuł)
│   │   ├── Breadcrumbs.astro    # ścieżka nawigacji (dostępna)
│   │   ├── Gallery.astro        # galeria + lightbox (natywny <dialog>)
│   │   ├── ContactForm.astro    # dostępny formularz + zgoda RODO
│   │   └── Icon.astro           # zestaw ikon SVG inline
│   │
│   ├── content/
│   │   └── blog/                # wpisy blogowe w Markdown
│   │       └── o-szkole-w-manreza.md
│   ├── content.config.ts        # schemat kolekcji „blog” (walidacja Zod)
│   │
│   ├── data/                    # dane / treść (jedno źródło prawdy)
│   │   ├── site.ts              # konfiguracja: nazwa, URL, kontakt, social
│   │   ├── navigation.ts        # menu główne i stopki
│   │   ├── home.ts              # cytaty, „liczby biblijne”
│   │   ├── about.ts             # biografia, języki, zainteresowania, motto
│   │   ├── retreats.ts          # metoda, 4 tygodnie, rachunek sumienia
│   │   └── links.ts             # pogrupowane linki zewnętrzne
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     # szablon: <html>, <head>, SEO, header, footer,
│   │                            #          tryb ciemny (bez FOUC), skip-link
│   │
│   ├── pages/                   # routing plikowy (jedna trasa = jeden plik)
│   │   ├── index.astro          # /            (strona główna)
│   │   ├── o-mnie.astro         # /o-mnie
│   │   ├── rekolekcje.astro     # /rekolekcje
│   │   ├── kontakt.astro        # /kontakt
│   │   ├── linki.astro          # /linki
│   │   ├── blog/
│   │   │   ├── index.astro      # /blog        (lista wpisów)
│   │   │   └── [...slug].astro  # /blog/<wpis> (pojedynczy wpis)
│   │   └── 404.astro            # strona błędu 404
│   │
│   └── styles/                  # system projektowy (CSS)
│       ├── tokens.css           # tokeny: kolory, typografia, odstępy, tryb ciemny
│       ├── reset.css            # nowoczesny reset + prefers-reduced-motion
│       ├── base.css             # typografia, prose, przyciski, a11y
│       ├── utilities.css        # klasy narzędziowe (grid, flow, cluster…)
│       └── global.css           # punkt wejścia (importuje powyższe)
│
├── docs/                        # dokumentacja + oferta
├── astro.config.mjs             # konfiguracja Astro (site, sitemap, obrazy)
├── tsconfig.json                # TypeScript + aliasy ścieżek
├── package.json
└── .editorconfig / .gitignore / .nvmrc
```

---

## 3. Zasady architektury

### Rozdzielenie treści od prezentacji
Wszystkie teksty i dane znajdują się w `src/data/` oraz `src/content/`.
Komponenty i strony jedynie renderują te dane. Dzięki temu:
- zmiana treści nie wymaga dotykania kodu prezentacji,
- łatwo dodać wielojęzyczność w przyszłości,
- treść jest spójna między stronami (np. dane kontaktowe w jednym miejscu).

### System projektowy oparty na tokenach
Kolory, typografia i odstępy pochodzą z **custom properties** w
[`tokens.css`](../src/styles/tokens.css). Tryb ciemny to nadpisanie tych samych
zmiennych — komponenty nie wiedzą, w jakim są motywie.

### Komponentowość
Powtarzalne elementy (nagłówek, stopka, galeria, formularz, ikony) są
komponentami wielokrotnego użytku. Strony składają się z sekcji i komponentów.

### Progresywne ulepszanie (progressive enhancement)
Strona działa bez JavaScriptu (treść, nawigacja, formularze przez `mailto`).
JS dodaje wygodę (menu mobilne oparte o natywny `<details>`, lightbox oparty o
natywny `<dialog>`, przełącznik motywu, scroll-spy) — ale nie jest warunkiem
dostępu do treści.

---

## 4. Routing i mapa adresów

| Adres | Plik | Typ |
| ----- | ---- | --- |
| `/` | `pages/index.astro` | statyczny |
| `/o-mnie` | `pages/o-mnie.astro` | statyczny |
| `/rekolekcje` | `pages/rekolekcje.astro` | statyczny |
| `/kontakt` | `pages/kontakt.astro` | statyczny |
| `/linki` | `pages/linki.astro` | statyczny |
| `/blog` | `pages/blog/index.astro` | statyczny |
| `/blog/:slug` | `pages/blog/[...slug].astro` | generowany z Markdown |
| `/404` | `pages/404.astro` | strona błędu |
| `/sitemap-index.xml` | automatyczny | generowany |
| `/robots.txt`, `/site.webmanifest` | `public/` | statyczny |

---

## 5. Przepływ budowania

```
npm run build
   │
   ├─ prebuild: scripts/generate-icons.mjs  → public/icons/*.png
   │
   └─ astro build
        ├─ renderuje strony .astro → statyczny HTML
        ├─ optymalizuje obrazy (astro:assets) → AVIF/WebP + srcset
        ├─ inline’uje krytyczny CSS, dzieli resztę
        ├─ generuje sitemap-index.xml
        └─ zapisuje wynik do dist/
```

Wynik (`dist/`) to komplet statycznych plików gotowych do wdrożenia.
