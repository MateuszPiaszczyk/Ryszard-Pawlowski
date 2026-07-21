# 07 · Instrukcja instalacji i wdrożenia

Ten dokument prowadzi krok po kroku przez uruchomienie projektu strony ks. Ryszarda Pawłowskiego (Astro 5, statyczny build SSG) i jego publikację w internecie. Jest to pełne rozwinięcie skróconej sekcji 8 „Wdrożenie produkcyjne" z `docs/03` — z gotowymi do wklejenia plikami (`.htaccess`, `deploy.yml`, konfiguracja nginx).

Dokument jest napisany dwutorowo:

- **Wariant A** — ręczne wgranie gotowej strony na klasyczny hosting przez FTP/SFTP. Wykona go osoba nietechniczna, mając panel hostingu i program FileZilla.
- **Wariant B** — automatyczne wdrożenie z GitHub (CI/CD). Skonfiguruje je deweloper; po skonfigurowaniu każda zmiana wdraża się sama po `git push`.

Efektem builda jest katalog `dist/` — zestaw statycznych plików HTML/CSS/obrazów. Serwer nie potrzebuje PHP, bazy danych ani Node — serwuje po prostu pliki.

### Dwie ścieżki wdrożenia

| | Wariant A — ręcznie FTP | Wariant B — automatycznie z GitHub |
|---|---|---|
| Dla kogo | osoba nietechniczna, klient | deweloper |
| Narzędzia | FileZilla / Menedżer plików cPanel | GitHub + GitHub Actions |
| Build strony | lokalnie na własnym komputerze | w chmurze na runnerze GitHub |
| Publikacja | ręcznie przeciągasz pliki `dist/` na serwer | automatycznie po `git push` na `main` |
| Aktualizacja treści | edycja → `npm run build` → ponowny upload | edycja → `git commit` → `git push` |
| Wymaga konta GitHub | nie | tak |
| Kiedy wybrać | jednorazowe wdrożenie, brak potrzeby CI, prosty hosting bez integracji z Git | częste aktualizacje, powtarzalność, brak ręcznej pracy przy każdej zmianie |

Obie ścieżki publikują tę samą zawartość katalogu `dist/` na tym samym klasycznym hostingu. Wariant B to zautomatyzowana wersja wariantu A. Można zacząć od A, a później włączyć B — nic nie trzeba zmieniać w kodzie.

---

## 1. Wymagania wstępne

Zanim zaczniesz, przygotuj poniższe. Kolumna „Potrzebne w" wskazuje, w którym wariancie dana rzecz jest konieczna.

| Element | Wersja / szczegóły | Potrzebne w | Skąd |
|---|---|---|---|
| Node.js | **22 (LTS)** — zgodnie z `.nvmrc`; `package.json` wymaga `>=20.3` | A (build lokalny); B robi to w chmurze | [nodejs.org](https://nodejs.org) lub nvm |
| npm | dołączony do Node (używamy `npm ci`, jest `package-lock.json`) | A | z Node |
| git | dowolna aktualna wersja | A (opcjonalnie), B | [git-scm.com](https://git-scm.com) |
| Konto klasycznego hostingu | z dostępem FTP/SFTP i panelem (cPanel / DirectAdmin) | A, B | dostawca hostingu |
| Dane FTP/SFTP | host, port, login, hasło | A, B | panel hostingu, sekcja „Konta FTP" |
| Klient FTP | **FileZilla** (lub Menedżer plików w panelu) | A | [filezilla-project.org](https://filezilla-project.org) |
| Konto GitHub | do repozytorium i CI/CD | B | [github.com](https://github.com) |
| GitHub CLI `gh` | opcjonalnie, ułatwia założenie repo | B (opcjonalnie) | [cli.github.com](https://cli.github.com) |

### 1.1 Node 22 przez nvm (zalecane)

Projekt zawiera plik `.nvmrc` z numerem wersji, więc `nvm` sam dobierze właściwego Node:

```bash
# Instalacja wskazanej w .nvmrc wersji (22), jeśli jeszcze jej nie masz:
nvm install
# Przełączenie na nią w bieżącym katalogu projektu:
nvm use            # odczyta .nvmrc -> Node 22
node -v            # sprawdź: v22.x.x
```

Bez `nvm` po prostu zainstaluj Node 22 LTS z [nodejs.org](https://nodejs.org) i potwierdź `node -v`. Wersje starsze niż 20.3 nie zbudują projektu.

---

## 2. Pobranie projektu i test lokalny

Umieść projekt na dysku (rozpakuj archiwum albo sklonuj repozytorium, jeśli już istnieje) i wejdź do katalogu głównego — tam, gdzie leżą `package.json` i `astro.config.mjs`.

```bash
# Wejdź do katalogu projektu (przykład):
cd ryszardpawlowski.eu

# Czysta, powtarzalna instalacja zależności z package-lock.json:
npm ci

# Podgląd na żywo podczas pracy nad treścią (serwer deweloperski):
npm run dev        # http://localhost:4321

# Build produkcyjny — to on tworzy katalog dist/ do wgrania na serwer:
npm run build      # prebuild wygeneruje ikony (sharp), potem astro build

# Podgląd gotowego, produkcyjnego builda LOKALNIE przed wgraniem:
npm run preview    # serwuje zawartość dist/ (domyślnie http://localhost:4321)
```

Uwagi:

- `npm ci` instaluje dokładnie to, co zapisano w `package-lock.json` — na Linuksie w CI pobierze się linuksowa wersja biblioteki `sharp` (używanej przez `scripts/generate-icons.mjs`), więc build w chmurze też działa.
- `npm run build` uruchamia najpierw `prebuild` (`scripts/generate-icons.mjs` → generuje ikony PNG z `public/favicon.svg`), a następnie `astro build`.
- Jeśli `npm run preview` pokazuje stronę poprawnie, to znaczy, że `dist/` jest gotowy do wgrania.

Dostępne skrypty npm:

| Polecenie | Działanie |
|---|---|
| `npm run dev` / `npm start` | serwer deweloperski, `http://localhost:4321` |
| `npm run build` | build produkcyjny → `dist/` (z `prebuild` = ikony) |
| `npm run preview` | lokalny podgląd zawartości `dist/` |
| `npm run check` | `astro check` (walidacja typów/treści) |
| `npm run icons` | ręczne wygenerowanie ikon |

---

## 3. Założenie repozytorium GitHub od zera

Projekt **nie jest jeszcze repozytorium git** (brak katalogu `.git`). Poniżej dwa równoważne warianty założenia repozytorium. Do repo trafia **wyłącznie kod źródłowy** — `.gitignore` już wyklucza `dist/`, `node_modules/`, `.astro/` i pliki środowiskowe.

> Ten krok jest potrzebny tylko dla **wariantu B** (CI/CD). Wariant A (ręczny FTP) nie wymaga GitHuba.

### 3.1 Z GitHub CLI (zalecane)

```bash
# Wykonaj w katalogu głównym projektu (tam gdzie package.json i astro.config.mjs)

# 0. Wymagania: zainstalowany gh i jednorazowe logowanie
gh --version
gh auth status || gh auth login   # GitHub.com -> HTTPS lub SSH -> zaloguj w przeglądarce

# 1. Inicjalizacja repozytorium i pierwszy commit
git init
git branch -M main                 # od razu ustaw gałąź główną na main
git add -A
git commit -m "Initial commit: strona ks. Ryszard Pawlowski (Astro 5)"

# 2. Utworzenie repo na GitHubie + remote origin + push (jedną komendą)
#    Zamień <owner> na swoją nazwę użytkownika lub organizacji GitHub.
gh repo create <owner>/ryszardpawlowski-eu --private --source=. --remote=origin --push

# 3. Weryfikacja
git remote -v
git log --oneline -1
gh repo view --web                 # otwiera repo w przeglądarce
```

### 3.2 Ręcznie przez github.com

```bash
# KROK A (w przeglądarce): github.com -> New repository
#   - Nazwa: ryszardpawlowski-eu
#   - Widoczność: Private
#   - NIE zaznaczaj Add a README, .gitignore ani licencji
#     (puste repo bez commitów, inaczej pierwszy push się rozjedzie).

# KROK B (w terminalu, w katalogu projektu):
git init
git branch -M main
git add -A
git commit -m "Initial commit: strona ks. Ryszard Pawlowski (Astro 5)"

# Podłączenie zdalnego repo — wybierz JEDEN wariant adresu:
# SSH (wymaga skonfigurowanego klucza SSH na koncie GitHub):
git remote add origin git@github.com:<owner>/ryszardpawlowski-eu.git
# LUB HTTPS (poprosi o login / Personal Access Token przy pushu):
# git remote add origin https://github.com/<owner>/ryszardpawlowski-eu.git

git push -u origin main
git remote -v                      # weryfikacja
```

> Przy wariancie HTTPS git od 2021 nie przyjmuje zwykłego hasła do konta — użyj **Personal Access Token**. Przy wariancie SSH wymagany jest wcześniej dodany klucz publiczny na koncie GitHub.

### 3.3 Co (nie) trafia do repo

```text
Do repozytorium idzie WYŁĄCZNIE kod źródłowy. .gitignore już wyklucza:
  dist/          <- katalog buildu (~9.6 MB) — generowany przez npm run build
  node_modules/  <- zależności — odtwarzane przez npm ci
  .astro/        <- cache Astro
  .output/, env.d.ts, .env*, .DS_Store, .vscode/* (poza extensions.json), .idea/

Po commicie sprawdź, że dist/ i node_modules/ NIE są śledzone:
  git status --ignored     (powinny być w sekcji Ignored files)
  git ls-files dist        (musi zwrócić PUSTO)

Uwaga: package-lock.json TRAFIA do repo (nie jest ignorowany) — to poprawne,
bo CI używa npm ci na jego podstawie.
```

---

## 4. Przygotowanie przed wdrożeniem (pre-flight)

Zanim zbudujesz wersję produkcyjną, upewnij się, że konfiguracja domeny jest spójna. Domena **kanoniczna** projektu to `https://ryszardpawlowski.eu` — **bez `www`**.

```bash
# Domena kanoniczna musi być identyczna w OBU miejscach (jest: bez www).
# W astro.config.mjs adres siedzi w stałej SITE_URL (linia 6), a pole site: SITE_URL z niej korzysta:
grep -n "SITE_URL" astro.config.mjs                        # export const SITE_URL = 'https://ryszardpawlowski.eu'; oraz site: SITE_URL
# W site.ts zawęź wzorzec, żeby NIE złapać author.url (piaszczykstudio.pl):
grep -n "url: 'https://ryszardpawlowski" src/data/site.ts  # url: 'https://ryszardpawlowski.eu'

# Po buildzie zweryfikuj wygenerowane pliki SEO w dist/:
cat dist/robots.txt        # Sitemap: https://ryszardpawlowski.eu/sitemap-index.xml
ls dist/sitemap-index.xml dist/sitemap-0.xml
grep -o "https://ryszardpawlowski.eu[^<]*" dist/sitemap-0.xml | head
# Adresy w sitemap i canonical MUSZĄ zaczynać się od wybranej wersji domeny.
```

Ważne zasady:

- Wybierz **jedną** wersję domeny (kanonicznie: bez `www`) i trzymaj się jej wszędzie: `astro.config.mjs` (stała `SITE_URL` użyta w polu `site`), `src/data/site.ts` (pole `url` witryny — nie mylić z `author.url`), `public/robots.txt`, sitemap oraz przekierowanie 301 na hostingu. Rozjazd `www`/bez-`www` duplikuje treść w oczach Google.
- Zmieniając domenę, edytuj stałą `SITE_URL` w `astro.config.mjs` (a nie samą linię `site:`, która tylko odczytuje tę stałą).
- `robots.txt`, sitemap i znaczniki `canonical` są generowane **w czasie builda**, a nie w locie. Po każdej zmianie domeny w konfiguracji uruchom ponownie `npm run build`.
- `robots.txt` zawiera: `Allow: /`, `Disallow: /_astro/` oraz `Sitemap: https://ryszardpawlowski.eu/sitemap-index.xml`.
- `lastmod` w sitemap jest ustawiony na **STAŁĄ, zahardkodowaną datę** w `astro.config.mjs` (`lastmod: new Date('2026-07-18')`) i obowiązuje globalnie dla **wszystkich** adresów. **Nie zmienia się automatycznie przy buildzie** — dopóki nie edytujesz tej daty ręcznie, sitemap zawsze pokaże 2026-07-18. Po istotnej aktualizacji treści zaktualizuj tę datę w konfiguracji i przebuduj, żeby `lastmod` odzwierciedlał świeżość.

Checklista pre-flight:

- [ ] `astro.config.mjs` → stała `SITE_URL = 'https://ryszardpawlowski.eu'` (bez www), użyta jako `site: SITE_URL`
- [ ] `src/data/site.ts` → `url: 'https://ryszardpawlowski.eu'` (identycznie; nie mylić z `author.url`)
- [ ] `astro.config.mjs` → `lastmod` w integracji sitemap ma aktualną datę (zahardkodowana — sprawdź ręcznie)
- [ ] `npm run build` przeszedł bez błędów
- [ ] `dist/robots.txt` wskazuje właściwy adres sitemap
- [ ] `dist/sitemap-0.xml` zawiera adresy zaczynające się od `https://ryszardpawlowski.eu`
- [ ] `dist/404.html` istnieje (własna strona błędu)
- [ ] zdecydowano o kanonicznej wersji domeny: **bez www** + przekierowanie 301 z www

---

## 5. Wariant A — ręczne wdrożenie na klasyczny hosting (FTP/SFTP)

### 5.1 Build produkcyjny

```bash
nvm use            # Node 22 (jeśli masz nvm)
npm ci             # czysta instalacja zależności
npm run build      # prebuild = ikony (sharp), potem astro build -> dist/
```

Po buildzie w katalogu `dist/` (~9,6 MB, ~310 plików) znajdziesz gotową stronę w formacie **directory** — każda podstrona to **folder z plikiem `index.html`**:

```text
dist/
├─ index.html                         # strona główna
├─ o-mnie/index.html                  # /o-mnie/
├─ rekolekcje/index.html              # /rekolekcje/
├─ kontakt/index.html                 # /kontakt/
├─ linki/index.html                   # /linki/
├─ blog/index.html                    # /blog/
├─ blog/o-szkole-w-manreza/index.html # wpis blogowy
├─ 404.html                           # strona błędu (w ROOCIE)
├─ _astro/                            # 289 plików CSS/fontów/obrazów z hashem (IMMUTABLE)
├─ robots.txt
├─ sitemap-index.xml
├─ sitemap-0.xml
├─ favicon.svg
├─ site.webmanifest
├─ icons/                             # wygenerowane ikony PNG
└─ og/og-image.jpg                    # obraz Open Graph 1200×630
```

Konsekwencja formatu **directory**: na Apache czyste adresy działają **bez żadnych reguł `RewriteRule`**. `DirectoryIndex` serwuje `/o-mnie/` z folderu, a `mod_dir` (`DirectorySlash On` domyślnie) sam robi 301 z `/o-mnie` na `/o-mnie/`. Pliki `_astro/` mają hash w nazwie, więc ich treść jest niezmienna (immutable) i można ją cache'ować na rok.

### 5.2 Co i gdzie wgrać

Wgrywasz **ZAWARTOŚĆ** katalogu `dist/`, a **nie sam folder `dist`**. Docelowo pliki mają trafić do katalogu WWW hostingu — najczęściej `public_html/` (cPanel), czasem `htdocs/` lub `www/`.

> **Najczęstszy błąd wdrożenia:** wgranie całego folderu `dist/` zamiast jego zawartości. Strona wyląduje wtedy pod `/dist/`, a główny adres pokaże 404. Zawsze przenoś to, co jest **WEWNĄTRZ** `dist/` (`index.html`, foldery podstron, `_astro/`, `404.html`, itd.) wprost do `public_html/`.

### 5.3 FileZilla krok po kroku

```text
1. Pobierz dane dostępowe z panelu hostingu (sekcja FTP / konta FTP):
   - Host:     np. ftp.twojadomena.pl  (albo adres IP serwera)
   - Port:     21 dla FTP  /  22 dla SFTP (SFTP bezpieczniejsze — jeśli dostępne)
   - Użytkownik / Hasło: z panelu hostingu
2. FileZilla -> pasek Quickconnect u góry:
   Host | Nazwa użytkownika | Hasło | Port -> klik „Szybkie połączenie".
   (Dla SFTP wpisz host jako:  sftp://ftp.twojadomena.pl  i port 22.)
3. W prawym panelu (Serwer) przejdź do katalogu głównego WWW:
   zwykle  public_html/  (czasem  www/  lub  htdocs/).
   Jeśli katalog nie jest pusty (stara strona) — najpierw usuń stare pliki.
4. W lewym panelu (Lokalny) wejdź do folderu  dist/  projektu.
5. Zaznacz CAŁĄ ZAWARTOŚĆ dist/ (Ctrl+A: index.html, foldery o-mnie/,
   rekolekcje/, _astro/, 404.html itd.) i przeciągnij ją do public_html/ po prawej.
6. Poczekaj na transfer wszystkich ~310 plików
   (dolny panel „Nieudane transfery" musi być pusty).
7. Otwórz https://ryszardpawlowski.eu i sprawdź podstrony oraz 404.
```

> Jeśli hosting oferuje SFTP (port 22), wybierz je — zwykły FTP (port 21) przesyła hasło i pliki tekstem jawnym.

### 5.4 Alternatywnie: Menedżer plików cPanel (ZIP)

```bash
# 1. Lokalnie spakuj ZAWARTOŚĆ dist/ do jednego ZIP (nie sam folder dist!):
cd dist && zip -r ../site.zip . && cd ..
#    (lub w Finderze: wejdź DO dist/, zaznacz wszystko w środku,
#     PPM -> Kompresuj — nie pakuj folderu dist z zewnątrz.)

# 2. cPanel -> Menedżer plików (File Manager) -> wejdź do  public_html/.
# 3. Usuń/zarchiwizuj stare pliki, jeśli katalog nie jest pusty.
# 4. Przycisk Prześlij (Upload) -> wybierz site.zip -> poczekaj na 100%.
# 5. Zaznacz site.zip -> PPM -> Wyodrębnij (Extract) -> do  public_html/.
# 6. Sprawdź, że  index.html  leży bezpośrednio w  public_html/
#    (a NIE w  public_html/dist/  — to najczęstszy błąd).
# 7. Usuń site.zip z serwera. Otwórz stronę i przetestuj podstrony + 404.
```

### 5.5 Konfiguracja Apache — plik `.htaccess`

Utwórz plik `.htaccess` w katalogu WWW (`public_html/`). Poniżej pełna, komentowana wersja. Każdy blok jest zamknięty w `<IfModule ...>` — na współdzielonym hostingu niektóre moduły bywają wyłączone, a takie opakowanie zapobiega błędom 500.

> **NIE dodawaj** reguł `RewriteRule` usuwających `.html` ani wymuszających ukośnik na siłę. Przy formacie build **directory** podstrony to foldery z `index.html`, a `mod_dir` sam robi poprawne 301 na wersję z ukośnikiem. Takie reguły tylko złamałyby nawigację.

```apache
# ============================================================
#  .htaccess — ryszardpawlowski.eu (Astro, build format: directory)
#  Umieść ten plik w katalogu WWW (np. public_html/).
#  Kanoniczna domena: https://ryszardpawlowski.eu  (BEZ www)
# ============================================================

# ---- 1. Kanoniczna domena + HTTPS (301) ----
#    UWAGA: reguły www i https ROZDZIELONE — łączenie ich przez [OR] z
#    warunkiem HTTPS miesza logikę AND/OR i utrudnia odporność na proxy.
<IfModule mod_rewrite.c>
  RewriteEngine On

  # a) www -> bez www (osobna reguła, przekierowuje od razu na https)
  RewriteCond %{HTTP_HOST} ^www\.ryszardpawlowski\.eu$ [NC]
  RewriteRule ^ https://ryszardpawlowski.eu%{REQUEST_URI} [L,R=301]

  # b) http -> https, ODPORNE NA PROXY z terminacją TLS (Cloudflare, load-balancer):
  #    tam Apache widzi połączenie jako nie-HTTPS (%{HTTPS} != on) mimo że klient
  #    używa https — sam warunek %{HTTPS} dałby PĘTLĘ 301. Dlatego wymagamy, by
  #    JEDNOCZEŚNIE nie było sygnału z proxy (X-Forwarded-Proto != https).
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^ https://ryszardpawlowski.eu%{REQUEST_URI} [L,R=301]
</IfModule>

# ---- 2. Własna strona błędu 404 ----
#    dist/404.html trafia do roota public_html/.
ErrorDocument 404 /404.html

# ---- 3. Wyłącz listowanie katalogów ----
Options -Indexes

# ---- 4. Nie ujawniaj pliku stanu deployu FTP (patrz sekcja 6.1) ----
#    Akcja zapisuje .ftp-deploy-sync-state.json do katalogu WWW — bez tej blokady
#    byłby publicznie pobieralny i ujawniałby manifest wdrożonych plików.
<Files ".ftp-deploy-sync-state.json">
  Require all denied
</Files>

# ---- 5. Kompresja tekstu (gzip/deflate; brotli jeśli dostępny) ----
#    NIE kompresujemy woff2/woff (są już skompresowane wewnętrznie) — analogicznie
#    do avif/webp. Ponowna kompresja to zmarnowany CPU bez zysku rozmiaru.
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE application/xml image/svg+xml
</IfModule>
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/css application/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/json image/svg+xml
</IfModule>

# ---- 6. Typy MIME (na wypadek starszego serwera) ----
<IfModule mod_mime.c>
  AddType image/webp                 .webp
  AddType image/avif                 .avif
  AddType font/woff2                 .woff2
  AddType font/woff                  .woff
  AddType application/manifest+json  .webmanifest
  AddType image/svg+xml              .svg
</IfModule>

# ---- 7. Cache przeglądarki ----
#    Zasoby z hashem (/_astro/: css, js, woff2, avif, webp) mają Cache-Control
#    immutable ustawiany NIŻEJ w mod_headers — tutaj ich NIE dublujemy, żeby
#    uniknąć konkurencyjnych/zdublowanych dyrektyw Cache-Control.
<IfModule mod_expires.c>
  ExpiresActive On
  # Niezhashowane zasoby (favicon, og-image) — umiarkowany cache.
  ExpiresByType image/svg+xml          "access plus 1 month"
  ExpiresByType image/jpeg             "access plus 1 month"
  ExpiresByType image/png              "access plus 1 month"
  # HTML nie cache'ujemy na sztywno — treść może się zmienić.
  ExpiresByType text/html              "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  # Pliki z hashem — immutable na rok. Nagłówek wiążemy z KATALOGIEM /_astro/
  # (a nie z rozszerzeniem), żeby przypadkowy niezhashowany plik css/js wgrany
  # poza /_astro/ nie został zamrożony na rok. Immutability wynika z hasha w ścieżce.
  SetEnvIf Request_URI "^/_astro/" IS_IMMUTABLE
  Header set Cache-Control "public, max-age=31536000, immutable" env=IS_IMMUTABLE

  # HTML — zawsze rewaliduj. FilesMatch działa na ROZWIĄZANYM pliku index.html,
  # więc łapie też czyste adresy katalogowe (/o-mnie/ -> o-mnie/index.html).
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>

  # ---- 8. Nagłówki bezpieczeństwa ----
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  # Nowocześniejszy odpowiednik X-Frame-Options:
  Header always set Content-Security-Policy "frame-ancestors 'self'"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

  # ---- 9. HSTS (OPCJONALNIE) ----
  # Włącz DOPIERO gdy HTTPS działa stabilnie na całej domenie i subdomenach.
  # Odkomentuj świadomie — cofnięcie jest trudne (przeglądarki pamiętają nagłówek).
  # Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

### 5.6 Alternatywa: nginx

Jeśli hosting działa na nginx (VPS lub konfiguracja własna), odpowiednikiem `.htaccess` jest blok `server {}`. Format **directory** obsługujemy przez `try_files ... /index.html` w katalogu.

> **Krytyczny footgun nginx:** dyrektywa `add_header` w bloku `location` **NIE dziedziczy** `add_header` z bloku `server` — deklaracja własnego `add_header` w `location` **kasuje wszystkie** odziedziczone nagłówki (również te z flagą `always`). Dlatego nagłówki bezpieczeństwa trzymamy w osobnym pliku snippet i **dołączamy `include` w KAŻDYM `location`, który ustawia własny `add_header`** — inaczej `/_astro/`, `.html` i strona 404 poszłyby do klienta bez `nosniff`, CSP itd.

Plik `snippets/security-headers.conf`:

```nginx
# snippets/security-headers.conf — dołączany w każdym location z add_header
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy "frame-ancestors 'self'" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

Konfiguracja serwera:

```nginx
# ============================================================
#  nginx — ryszardpawlowski.eu (Astro, build format: directory)
#  Kanoniczna domena: https://ryszardpawlowski.eu (BEZ www)
# ============================================================

# --- Przekierowanie www + http -> https bez www (301) ---
server {
    listen 80;
    listen [::]:80;
    server_name ryszardpawlowski.eu www.ryszardpawlowski.eu;
    return 301 https://ryszardpawlowski.eu$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.ryszardpawlowski.eu;
    # ssl_certificate ... ; ssl_certificate_key ... ;
    return 301 https://ryszardpawlowski.eu$request_uri;
}

# --- Serwis właściwy ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ryszardpawlowski.eu;

    root /var/www/ryszardpawlowski.eu;   # tu leży ZAWARTOŚĆ dist/
    index index.html;

    # ssl_certificate     /etc/letsencrypt/live/ryszardpawlowski.eu/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/ryszardpawlowski.eu/privkey.pem;

    # Format directory. WAŻNE: dla żądania /o-mnie nginx serwuje /o-mnie/index.html
    # WEWNĘTRZNIE (status 200) — BEZ zewnętrznego 301 na wersję z ukośnikiem, czyli
    # INACZEJ niż Apache mod_dir. Treść jest wtedy dostępna pod /o-mnie i /o-mnie/;
    # spójność adresu zapewnia tag canonical z Astro, nie serwer. Jeśli koniecznie
    # potrzebujesz 301 na wersję z ukośnikiem, dodaj jawną regułę
    # (np. `if (-d $request_filename) { rewrite ^([^.]*[^/])$ $1/ permanent; }`).
    location / {
        include snippets/security-headers.conf;   # inaczej strony straciłyby nagłówki
        # HTML — zawsze rewaliduj. Kluczowe: URI stron (/, /o-mnie/) NIE kończy się
        # na .html, więc regex \.html$ ich NIE łapie — cache dla HTML ustawiamy TU.
        add_header Cache-Control "no-cache, must-revalidate" always;
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Własna strona 404 (też musi dostać nagłówki bezpieczeństwa)
    error_page 404 /404.html;
    location = /404.html {
        internal;
        include snippets/security-headers.conf;
        add_header Cache-Control "no-cache, must-revalidate" always;
    }

    # Zasoby immutable z /_astro/ — cache na rok.
    # Jedno źródło prawdy: sam add_header (bez `expires`, które dołożyłoby drugi,
    # konkurencyjny nagłówek Cache-Control).
    location /_astro/ {
        include snippets/security-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }

    # Dodatkowe pokrycie bezpośrednich żądań .html (np. /404.html, /.../index.html)
    location ~* \.html$ {
        include snippets/security-headers.conf;
        add_header Cache-Control "no-cache, must-revalidate" always;
    }

    # Nie ujawniaj pliku stanu deployu FTP (patrz sekcja 6.1)
    location = /.ftp-deploy-sync-state.json { deny all; }

    # Kompresja (bez woff2 — już skompresowane wewnętrznie)
    gzip on;
    gzip_types text/plain text/css application/javascript application/json
               image/svg+xml application/xml;

    # Uwaga: nagłówki bezpieczeństwa na poziomie server{} miałyby sens tylko dla
    # odpowiedzi trafiających poza powyższe location — w praktyce wszystkie trasy
    # mają własny add_header, dlatego include jest w każdym location powyżej.
}
```

### 5.7 HTTPS / SSL

- W panelu (cPanel) użyj **AutoSSL** albo ręcznie wystaw certyfikat **Let's Encrypt** dla `ryszardpawlowski.eu` i `www.ryszardpawlowski.eu`.
- Po włączeniu HTTPS otwórz stronę pod `http://` i pod `www.` — powinny przekierować (301) na `https://ryszardpawlowski.eu`.
- Jeśli TLS jest terminowany na proxy/load-balancerze (częste na współdzielonym hostingu za Cloudflare), pamiętaj o warunku `X-Forwarded-Proto` z sekcji 5.5 — bez niego wymuszenie HTTPS wpadnie w pętlę 301.
- Dopiero gdy HTTPS działa stabilnie, rozważ włączenie **HSTS** (zakomentowany nagłówek w konfiguracji powyżej).

---

## 6. Wariant B — automatyczne wdrożenie z GitHub (CI/CD)

Po połączeniu repozytorium z GitHub Actions każdy `git push` na gałąź `main` sam zbuduje stronę w chmurze i wgra ją na hosting.

### 6.1 GitHub Actions → FTP na klasyczny hosting

Utwórz w repozytorium plik `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy (FTP)

on:
  push:
    branches: [main]
  workflow_dispatch: {}

concurrency:
  group: ftp-deploy
  # false: raz rozpoczęty transfer FTP dokończy się przed kolejnym. Anulowanie
  # w trakcie uploadu mogłoby zostawić na serwerze częściowo wgrane pliki i
  # rozjechać plik stanu synchronizacji przyrostowej.
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Node
        uses: actions/setup-node@v5
        with:
          node-version: 22          # zgodnie z .nvmrc
          cache: 'npm'

      - name: Install dependencies
        run: npm ci                 # jest package-lock.json

      - name: Build (prebuild generuje ikony przez sharp)
        run: npm run build          # tworzy dist/

      - name: Deploy to FTPS
        uses: SamKirkland/FTP-Deploy-Action@v4.4.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps            # szyfrowane; czysty FTP przesyła hasło jawnie
          port: 21                  # FTPS explicit zwykle 21 (implicit często 990)
          local-dir: ./dist/        # KOŃCOWY UKOŚNIK = wgraj ZAWARTOŚĆ dist/
          server-dir: /public_html/ # katalog WWW hostingu (sprawdź w panelu!)
          state-name: .ftp-deploy-sync-state.json
          # (Brak bloku exclude: local-dir to ./dist/, a build NIE zawiera .git/
          #  node_modules/ ani .github/ — nie ma czego wykluczać.)
```

**Sekrety** — ustaw w repo: `Settings → Secrets and variables → Actions → New repository secret`:

```text
FTP_SERVER     = host FTP z panelu hostingu (np. ftp.twojadomena.pl albo IP)
FTP_USERNAME   = login konta FTP
FTP_PASSWORD   = hasło konta FTP

(NIE trzymaj tych wartości w repo/YAML — tylko jako Secrets.)
```

Jak to działa i o czym pamiętać:

- **`local-dir: ./dist/`** — końcowy ukośnik jest obowiązkowy: oznacza „wgraj ZAWARTOŚĆ `dist/`". Bez ukośnika akcja może utworzyć na serwerze zagnieżdżony `/public_html/dist/`.
- **`server-dir`** zależy od hostingu: `/public_html/` to typowy cPanel; inni dają `/htdocs/`, `/www/` lub pusty `/`. Zły katalog = strona nie pojawi się albo trafi w złe miejsce.
- **Synchronizacja przyrostowa** — akcja porównuje pliki lokalne z plikiem stanu `.ftp-deploy-sync-state.json` leżącym w `server-dir`. Kolejne deploye wysyłają tylko zmiany, więc są szybkie.
- **Plik stanu jest publiczny!** — `.ftp-deploy-sync-state.json` ląduje w katalogu WWW, więc bez blokady byłby pobieralny pod `https://ryszardpawlowski.eu/.ftp-deploy-sync-state.json` i ujawniałby manifest wdrożonych plików (ścieżki + hashe). Zablokuj do niego dostęp regułą z sekcji 5.5 (Apache `<Files>` / nginx `location = ... { deny all; }`).
- **`protocol: ftps`** — szyfrowane połączenie. Jeśli hosting ma niedopasowany/self-signed certyfikat TLS albo wymaga starszego trybu, użyj `protocol: ftps-legacy`. Akcja (oparta o `basic-ftp`, wersja 4.x) **nie ma osobnego pola `security` (loose/strict)** — szyfrowaniem steruje wyłącznie `protocol` (`ftp` / `ftps` / `ftps-legacy`).
- **Uwaga:** ta akcja **nie obsługuje SFTP (SSH)** — to inny protokół. Dla SFTP potrzebna byłaby inna akcja (np. `wlixcc/SFTP-Deploy-Action`) o innych nazwach pól.
- **Trigger** — `push` na `main` oraz `workflow_dispatch` (ręczne uruchomienie z zakładki Actions).

**Migracja ze starej strony (Microweber) — jednorazowe czyszczenie.** Pierwszy deploy na katalog z resztkami starej strony **nie usunie** starych plików sam — zostaną obok nowych. Aby wyczyścić serwer i wgrać od zera, dodaj **jednorazowo** input `dangerous-clean-slate: true`, uruchom deploy, a potem **usuń** ten input:

```text
# Synchronizacja PRZYROSTOWA (domyślnie):
# 1) PIERWSZY deploy na PUSTY katalog: brak stanu = wgrywa wszystko, tworzy plik stanu.
# 2) Katalog ma stare pliki, chcesz czysto: jednorazowo dodaj do kroku FTP:
#      dangerous-clean-slate: true
#    -> kasuje CAŁY server-dir i wgrywa od zera. Po JEDNYM przebiegu USUŃ ten input.
# 3) Stan się rozjechał: usuń ręcznie .ftp-deploy-sync-state.json z server-dir przez FTP
#    i uruchom workflow ponownie (workflow_dispatch).
```

> Wersje major akcji GitHub bumpują się szybko. Tagi w tym pliku są **sprawdzone i działające** (stan: lipiec 2026): `actions/checkout@v5`, `actions/setup-node@v5` (oba mają już major v5), `SamKirkland/FTP-Deploy-Action@v4.4.0`. Przed pierwszym commitem i tak zweryfikuj najnowszy stabilny tag na stronie Releases. Nie pinuj do `@master`.

### 6.2 (Opcjonalnie) GitHub Pages jako darmowy hosting statyczny

GitHub Pages to darmowy hosting statyczny — **nie jest** klasycznym hostingiem opisanym wyżej; używaj go jako alternatywy, a nie równolegle z FTP.

> Uruchamiaj **tylko jeden** workflow deployujący (`deploy.yml` **LUB** `pages.yml`). Dwa naraz na push do `main` to podwójne, konkurencyjne wdrożenia.

Plik `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages (opcjonalnie)

on:
  push:
    branches: [main]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Build & upload (Astro)
        uses: withastro/action@v6      # sam instaluje, buduje i uploaduje artefakt
        with:
          node-version: 22

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Konfiguracja:

- W repo: `Settings → Pages → Source = GitHub Actions`. Pominięcie bloku `permissions` (`pages: write`, `id-token: write`) = błąd wdrożenia.
- **Własna domena:** dodaj plik `public/CNAME` z jedną linią `ryszardpawlowski.eu` (Astro skopiuje go do `dist/`), ustaw domenę w `Settings → Pages` oraz skonfiguruj DNS (rekord `A`/`ALIAS` na apex albo `CNAME` na `www`). Bez pliku `public/CNAME` Pages może zresetować domenę przy deployu.
- **`base` zostaje `/`** — projekt ma własną domenę, więc **nie ustawiaj** `base` w `astro.config.mjs`. `base: '/repo'` popsułby ścieżki na `ryszardpawlowski.eu`. `base` ustawia się tylko dla adresów typu `user.github.io/repo`.
- Tagi akcji jak w 6.1: `withastro/action@v6` (v6.1.2) i `actions/deploy-pages@v5` są aktualne; `actions/checkout` podbito do `@v5`.

---

## 7. Cykl aktualizacji treści i ponownego wdrożenia

Treść edytuje się w plikach źródłowych — dane strony w `src/data/`, wpisy blogowe w `src/content/blog/` (szczegóły w `docs/05` — przewodnik edycji treści).

**Wariant A (ręcznie):**

```bash
nvm use
npm run build          # przebuduj dist/
# następnie wgraj ZAWARTOŚĆ dist/ przez FileZilla do public_html/ (patrz 5.3)
```

**Wariant B (automatycznie):**

```bash
git add -A
git commit -m "Aktualizacja treści: <opis zmiany>"
git push               # push na main -> GitHub Actions sam zbuduje i wdroży
```

Po zmianie **domeny** w konfiguracji zawsze potrzebny jest nowy build (`robots.txt`, sitemap i `canonical` generują się w czasie builda). Pamiętaj też o ręcznej aktualizacji daty `lastmod` w `astro.config.mjs` po istotnej zmianie treści — nie zmienia się ona automatycznie (patrz sekcja 4).

---

## 8. Weryfikacja po wdrożeniu

- [ ] **HTTPS działa** — `https://ryszardpawlowski.eu` ładuje się z kłódką
- [ ] **Wymuszenie HTTPS** — `http://ryszardpawlowski.eu` przekierowuje 301 na `https://`
- [ ] **www → bez www** — `https://www.ryszardpawlowski.eu` przekierowuje 301 na `https://ryszardpawlowski.eu`
- [ ] **Strona główna** działa (`/`)
- [ ] **Wszystkie podstrony** (czyste adresy): `/o-mnie/`, `/rekolekcje/`, `/kontakt/`, `/linki/`, `/blog/`, `/blog/o-szkole-w-manreza/`
- [ ] **Adres bez ukośnika** (np. `/o-mnie`) przekierowuje 301 na wersję z ukośnikiem — **dotyczy Apache (`mod_dir`)**; na **nginx** treść jest serwowana pod oboma adresami bez 301, a spójność zapewnia tag `canonical` (patrz sekcja 5.6)
- [ ] **Losowy zły adres** (np. `/nie-ma-takiej-strony`) pokazuje własny `404.html`, a nie generyczną stronę hostingu
- [ ] **Plik stanu FTP niedostępny** — `https://ryszardpawlowski.eu/.ftp-deploy-sync-state.json` zwraca 403/404 (blokada z sekcji 5.5)
- [ ] **Podgląd OG** — link do strony w social media / [opengraph.xyz](https://www.opengraph.xyz) pokazuje `og/og-image.jpg` (1200×630)
- [ ] **Sitemap w Google Search Console** — zgłoszony `https://ryszardpawlowski.eu/sitemap-index.xml`
- [ ] **Lighthouse / PageSpeed Insights** — szybki test wydajności i dostępności
- [ ] **Formularz kontaktowy i newsletter** podłączone (integracje wg `docs/03`)

---

## 9. Rozwiązywanie problemów

| Objaw | Prawdopodobna przyczyna | Rozwiązanie |
|---|---|---|
| Podstrony dają 404, strona główna działa | Wgrano **folder `dist`** zamiast jego zawartości — pliki są w `/dist/` | Przenieś zawartość `dist/` wprost do `public_html/`; `index.html` ma leżeć bezpośrednio w katalogu WWW |
| Wszystkie adresy 404, brak `index.html` | Zły `server-dir` w CI albo wgrano do złego katalogu | Sprawdź katalog WWW w panelu (`public_html`/`htdocs`/`www`) i popraw `server-dir`/miejsce uploadu |
| Podstrona `/o-mnie/` → 404 mimo poprawnych plików | Wyłączony `DirectoryIndex` na hostingu | Upewnij się, że serwer serwuje `index.html` z folderu; na nginx dodaj `try_files $uri $uri/ $uri/index.html =404` |
| Pętla przekierowań 301 (`ERR_TOO_MANY_REDIRECTS`) | TLS terminowany na proxy — Apache widzi połączenie jako nie-HTTPS mimo https u klienta | Użyj warunku `RewriteCond %{HTTP:X-Forwarded-Proto} !https` obok `%{HTTPS} !=on` (sekcja 5.5) |
| Własny 404 się nie pokazuje | Brak `ErrorDocument 404 /404.html` lub `404.html` nie w roocie | Dodaj dyrektywę do `.htaccess`; wgraj `404.html` do `public_html/` |
| Strona 404 lub `/_astro/` bez nagłówków bezpieczeństwa (nginx) | `add_header` w `location` skasował odziedziczone nagłówki z `server` | Dołącz `include snippets/security-headers.conf;` w KAŻDYM `location` z własnym `add_header` (sekcja 5.6) |
| Podstrony HTML cache'owane mimo „no-cache" (nginx) | Regex `\.html$` nie łapie URI stron (`/`, `/o-mnie/`) | Ustaw `Cache-Control: no-cache` w `location /`, nie tylko w `~* \.html$` (sekcja 5.6) |
| Obrazy/fonty 404 lub zły MIME (`.webp`/`.avif`/`.woff2`) | Starszy serwer bez zarejestrowanych typów MIME | Dodaj blok `AddType` z sekcji 5.5 (Apache) lub odpowiednik nginx |
| Build w CI pada na instalacji | Zła wersja Node lub użyto `npm install` zamiast `npm ci` | Ustaw `node-version: 22`; użyj `npm ci` (jest `package-lock.json`) |
| Build w CI pada na `prebuild`/ikonach (`sharp`) | Brak binariów `sharp` | Na runnerze `ubuntu-latest` `npm ci` pobiera binaria linux automatycznie — sprawdź, czy `npm ci` w ogóle się wykonał |
| Mieszana treść / brak kłódki HTTPS | Zasoby ładowane po `http://` albo brak certyfikatu | Włącz AutoSSL/Let's Encrypt; wymuś HTTPS w `.htaccess`; upewnij się, że `site` = `https://...` i przebuduj |
| Białe strony / złe ścieżki zasobów | Ustawiony `base` przy własnej domenie | Usuń `base` z `astro.config.mjs` (dla własnej domeny `base` = `/`), przebuduj |
| FTP: wgrano folder `dist` zamiast zawartości | Przeciągnięto cały katalog `dist/` | Wgraj to, co jest wewnątrz `dist/`; w CI pilnuj `local-dir: ./dist/` z ukośnikiem |
| Sync FTP nie usuwa starych plików | Resztki starej strony obok nowej | Jednorazowo `dangerous-clean-slate: true`, potem usuń input; albo ręcznie wyczyść katalog i skasuj `.ftp-deploy-sync-state.json` |
| Deploy FTP: timeout | Zły port dla trybu TLS | FTPS explicit zwykle `21`, implicit często `990` — sprawdź w panelu |
| Deploy FTP: błąd certyfikatu TLS | Self-signed/niedopasowany certyfikat hostingu | Użyj `protocol: ftps-legacy` (akcja nie ma pola `security`) |
| Duplikacja treści w Google | Rozjazd `www`/bez-www lub `http`/`https` | Ujednolić do `https://ryszardpawlowski.eu` w konfiguracji, `robots`, sitemap i 301 na hostingu |

---

## 10. Szybka ściąga — od zera do produkcji

**Wariant A — ręcznie (FTP):**

```bash
nvm use                 # Node 22
npm ci                  # instalacja zależności
npm run build           # -> dist/
npm run preview         # (opcjonalny podgląd lokalny)
# FileZilla -> Quickconnect -> public_html/
# przeciągnij ZAWARTOŚĆ dist/ (nie folder dist) do public_html/
# umieść .htaccess w public_html/  (sekcja 5.5)
# sprawdź: podstrony, 404, HTTPS, www->bez-www
```

**Wariant B — automatycznie (GitHub → FTP):**

```bash
# jednorazowo:
git init && git branch -M main
git add -A && git commit -m "Initial commit: strona ks. Ryszard Pawlowski (Astro 5)"
gh repo create <owner>/ryszardpawlowski-eu --private --source=. --remote=origin --push
# dodaj plik .github/workflows/deploy.yml (sekcja 6.1)
# ustaw Secrets: FTP_SERVER, FTP_USERNAME, FTP_PASSWORD
# push wywoła build + deploy:
git add -A && git commit -m "CI: workflow FTP" && git push

# każda kolejna aktualizacja:
git add -A && git commit -m "Aktualizacja treści" && git push
```

---

© 2026 Ryszard Pawłowski Rekolekcje · Projekt i realizacja: **Piaszczyk Studio**