# 05 · Przewodnik edycji treści

Ten przewodnik pokazuje, jak zmieniać najczęściej aktualizowane treści bez
znajomości programowania. Wszystkie teksty są w plikach tekstowych — wystarczy je
otworzyć w edytorze, zmienić słowa i zapisać, a następnie odświeżyć stronę
(`npm run build` lub automatyczny deploy).

> Zmieniasz **tylko tekst w cudzysłowach**. Nie usuwaj przecinków, nawiasów ani
> nazw po lewej stronie dwukropka.

---

## 1. Dane kontaktowe, nazwa, opis → `src/data/site.ts`

```ts
contact: {
  email: 'ryszardpawlowski62@o2.pl',   // ← zmień e-mail
  phone: '+48 731 052 705',            // ← zmień telefon (wyświetlany)
  phoneHref: '+48731052705',           // ← ten sam numer bez spacji
},
```
Tu też zmienisz opis strony (używany w Google i social media) oraz link do YouTube.

---

## 2. Cytaty i „liczby biblijne” (strona główna) → `src/data/home.ts`

```ts
{ text: 'Milczenie jest jak odźwierny wewnętrznego życia.',
  author: 'św. Josemaría Escrivá' },
```
Aby dodać cytat, skopiuj jeden blok `{ … }` i zmień tekst. Analogicznie liczby:
```ts
{ value: '40', label: 'Dni Jezus pościł na pustyni' },
```

---

## 3. Biografia (strona „O mnie”) → `src/data/about.ts`

Sekcje kalendarium to lista wpisów:
```ts
{
  key: 'swiecenia',
  heading: 'Święcenia kapłańskie',
  marker: '1989',
  lines: [
    '27 maja 1989 r.',
    'Katedra św. Michała Archanioła w Łomży.',
  ],
},
```
Zmieniaj `heading` (tytuł), `marker` (rok/data z boku) i kolejne `lines`
(punkty). Języki i zainteresowania to proste listy w tym samym pliku.

---

## 4. Treść rekolekcji → `src/data/retreats.ts`

Trzy listy: metoda medytacji, cztery tygodnie, rachunek sumienia. Każdy element
ma tytuł i opis — edytuj tekst w cudzysłowach.

---

## 5. Linki (strona „Linki”) → `src/data/links.ts`

```ts
{
  href: 'https://episkopat.pl/',
  title: 'Konferencja Episkopatu Polski',
  description: 'Serwis Episkopatu Polski — dokumenty i komunikaty.',
},
```

---

## 6. Blog — dodanie nowego wpisu

1. Skopiuj plik `src/content/blog/o-szkole-w-manreza.md`.
2. Nazwij go np. `rekolekcje-adwentowe.md` (nazwa pliku = adres wpisu:
   `/blog/rekolekcje-adwentowe`). Używaj małych liter i myślników, bez polskich znaków.
3. Uzupełnij nagłówek i treść:

```markdown
---
title: Rekolekcje adwentowe
description: Krótki opis wpisu (pojawi się w Google i na liście bloga).
pubDate: 2026-12-01
category: Zapowiedzi
tags: [adwent, rekolekcje]
---

## Śródtytuł

Treść akapitu. **Pogrubienie**, *kursywa*, [link](/rekolekcje).

- punkt pierwszy
- punkt drugi
```

Ustaw `draft: true`, aby wpis był niewidoczny na żywej stronie (widoczny tylko
lokalnie do czasu ukończenia).

---

## 7. Zdjęcia

1. Wgraj plik do odpowiedniego katalogu w `src/assets/images/`
   (np. `gallery/` dla galerii, `content/` dla sekcji).
2. Galeria dodaje nowe zdjęcia automatycznie (na podstawie zawartości katalogu).
3. Dla zdjęć w konkretnych sekcjach poproś wykonawcę o podpięcie — wymaga
   drobnej zmiany w kodzie strony.

**Wskazówka:** nie musisz pomniejszać zdjęć — system zrobi to automatycznie.
Zadbaj tylko o sensowny opis (`alt`) dla dostępności.

---

## 8. Sekcje „do uzupełnienia”

Miejsca oznaczone na stronie ramką z ikoną ℹ️ (terminy rekolekcji, cennik,
odtwarzacz „Modlitwa w drodze”, formularz/biuletyn) czekają na dane lub
integrację. Przekaż wykonawcy: terminy, ceny, dane usługi mailingowej — zostaną
podłączone.

---

## Publikacja zmian

- **Hosting z Git (Netlify/Cloudflare):** zapis + `git push` = automatyczna
  publikacja w ~1–2 min.
- **Hosting klasyczny:** `npm run build`, a następnie wgranie zawartości `dist/`.

W razie wątpliwości skontaktuj się z **Piaszczyk Studio**.
