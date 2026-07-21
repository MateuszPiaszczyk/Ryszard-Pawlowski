# 01 · Analiza oryginalnej strony (Microweber)

Dokument podsumowuje analizę istniejącej strony **https://ryszardpawlowski.eu/**
przeprowadzoną przed rozpoczęciem prac, pod kątem architektury, technologii,
treści i zidentyfikowanych problemów.

---

## 1. Technologia i architektura

| Element | Ustalenie |
| ------- | --------- |
| **CMS** | Microweber (kreator typu „drag & drop”) — potwierdzone przez `<meta name="generator" content="Microweber">` oraz stopkę „Website Builder - Microweber” |
| **Szablon** | `new-world` (`/userfiles/templates/new-world/…`) |
| **Struktura plików** | Zasoby w `/userfiles/media/default/`, miniatury w `/userfiles/cache/thumbnails/450/` |
| **Renderowanie** | Server-side (PHP), strona składana z „modułów” kreatora |
| **Zasoby** | Wiele plików CSS/JS szablonu, biblioteki kreatora, brak nowoczesnej optymalizacji obrazów |

### Charakterystyka Microweber
Microweber to open-source’owy kreator stron. Zaleta: prosta edycja treści w
przeglądarce. Wady w tym wdrożeniu: narzut wydajnościowy (duży CSS/JS szablonu,
nieoptymalizowane obrazy), ograniczona kontrola nad semantyką HTML, dostępnością
i szczegółami SEO, a także pozostałości domyślnego szablonu (patrz niżej).

---

## 2. Mapa strony (architektura informacji)

```
/                     Strona główna (hero, cytaty, „liczby biblijne”,
                      „Modlitwa w drodze”, Zakon Rycerzy, newsletter)
/o-mnie               Biografia + duża galeria zdjęć (~57)
/rekolekcje           Rekolekcje ignacjańskie (metoda, 4 tygodnie,
                      rachunek sumienia, lektury, formularz)
/kontakt              Dane kontaktowe (e-mail, telefon)
/linki                Zbiór linków zewnętrznych
/blog                 Wpisy („Świadectwa, opinie, komentarze”)
YouTube (link zewn.)  https://www.youtube.com/@SacRyszardPawlowski
```

Nawigacja główna: Home · O mnie · Rekolekcje Ignacjańskie · YouTube · Kontakt ·
Linki · (Blog w stopce).

---

## 3. Treść i tożsamość

Strona dotyczy **ks. Ryszarda Pawłowskiego** — kapłana prowadzącego rekolekcje
ignacjańskie (Ćwiczenia Duchowe św. Ignacego Loyoli). Kluczowe motywy: cisza,
milczenie, medytacja Słowa Bożego, towarzyszenie duchowe.

Najważniejsze dane merytoryczne odtworzone w nowym serwisie:

- **Biografia:** ur. 30 marca 1962 w Ostrołęce; święcenia 27 maja 1989 (Łomża);
  posługa w Polsce i we Włoszech (1993–2017); mariologia; kapelan Zakonu Rycerzy
  św. Jana Pawła II.
- **Rekolekcje:** metoda medytacji (przed / w trakcie / po), cztery tygodnie
  Ćwiczeń, ignacjański rachunek sumienia (5 punktów).
- **Cytaty:** św. Josemaría Escrivá, *S. Ignat. vitae*, Adam Mickiewicz.
- **Kontakt:** e-mail `ryszardpawlowski62@o2.pl`, tel. `+48 731 052 705`.

> **Uwaga:** w sieci funkcjonuje też znany himalaista o tym samym nazwisku — to
> **inna osoba**. Cała treść nowego serwisu dotyczy wyłącznie ks. Ryszarda
> Pawłowskiego (rekolekcje).

---

## 4. Inwentaryzacja zasobów graficznych

Pobrano i wykorzystano **oryginalne** zdjęcia ze strony (łącznie 70 plików):

| Grupa | Pliki źródłowe | Zastosowanie w nowym serwisie |
| ----- | -------------- | ----------------------------- |
| Portret / hero | `rp23.jpg`, `imge-20241205-vvss.jpg` | Hero, portret „O mnie”, obraz OG |
| Treściowe | `3ks.jpg`, `ggl.jpg`, `i-anni202.jpg`, `gietrzwald.jpg`, `whatsapp-…jpeg`, `gemini-…png`, `sa76868-1.jpg`, `sa76873-1.jpg` | Sekcje tematyczne |
| Książki | `pozycje-ksiazkowe-4-6-v2.jpg`, `pozycje-ksiazkowe-7-9-v2.jpg` | Polecane lektury |
| Galeria | 57 miniatur `tn-*.jpg` (450 px) | Galeria na „O mnie” |

W nowym projekcie obrazy są automatycznie konwertowane do **AVIF/WebP** i
serwowane w responsywnych rozmiarach (oszczędność 60–95% wagi).

---

## 5. Zidentyfikowane problemy (i sposób ich rozwiązania)

| Problem w oryginale | Rozwiązanie w nowym projekcie |
| ------------------- | ----------------------------- |
| Pozostałości szablonu demonstracyjnego („Explore the features”, „A Slider — Your text here”, teksty EN „Hi, Guest / Login / Register”) | Usunięte; spójna, celowa treść po polsku |
| Brak tekstów alternatywnych (`alt`) przy obrazach | Każdy obraz ma sensowny `alt`; galeria z dostępnym lightboxem |
| Ubogie meta dane (`og:title` = „Home”, brak Twitter Cards, brak danych strukturalnych) | Pełny zestaw meta / OG / Twitter + JSON-LD (Person, WebSite, Breadcrumb, BlogPosting) |
| Nieoptymalizowane, ciężkie obrazy (pliki 2 MB+) | Optymalizacja AVIF/WebP + `srcset` + lazy-loading |
| Narzut wydajnościowy kreatora (duży CSS/JS) | Statyczny HTML/CSS, minimalny JS, krytyczny CSS inline |
| Mieszanka języków (PL/EN) w interfejsie | Spójny język polski, `lang="pl"` |
| Brak trybu ciemnego, ograniczona dostępność klawiaturowa | Tryb ciemny (auto + przełącznik), pełna obsługa klawiatury, „skip link”, focus states |
| Brak strony 404, sitemap ograniczony | Dedykowana strona 404, automatyczny `sitemap-index.xml`, `robots.txt` |

---

## 6. Wnioski

Oryginalna strona spełnia podstawową funkcję informacyjną, ale technologia
(kreator Microweber z szablonem demonstracyjnym) ogranicza wydajność, SEO,
dostępność i profesjonalny odbiór. Nowy projekt zachowuje **całą wartościową
treść i oryginalne zdjęcia**, podnosząc jednocześnie jakość techniczną i wizualną
do poziomu reprezentacyjnej wizytówki.
