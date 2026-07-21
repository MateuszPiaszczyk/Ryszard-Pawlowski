/**
 * Treści merytoryczne strony „Rekolekcje ignacjańskie".
 * Wiernie na podstawie oryginalnej strony ks. Ryszarda Pawłowskiego.
 */

export interface MethodStep {
  phase: string;
  intro?: string;
  points: string[];
}

export const meditationMethod: MethodStep[] = [
  {
    phase: 'Przed medytacją',
    intro:
      'Podstawą jest medytowanie Słowa Bożego. Czytamy wybrany tekst wolniej, ' +
      'zatrzymując się na poszczególnych zdaniach, wyrażeniach i słowach — tak, ' +
      'by wychwycić to, co dla nas najistotniejsze: co nas uderza, zastanawia, ' +
      'prowokuje, niepokoi.',
    points: [
      'Postawa ciała.',
      'Wyciszenie wewnętrzne.',
      'Stawienie siebie w obecności Boga.',
    ],
  },
  {
    phase: 'Medytacja',
    intro:
      'Medytacja ignacjańska jest spotkaniem człowieka ze Słowem Bożym — ' +
      'obejmuje sferę intelektualną, zmysłową i wolitywną oraz całą relację ' +
      'człowieka do Boga, innych, siebie i świata.',
    points: [
      'Modlitwa przygotowawcza.',
      'Wyobrażenie sobie miejsca.',
      'Prośba o owoc danego rozmyślania.',
      'Co Bóg mówi? — słuchać, patrzeć, rozumieć.',
      'Poddać się osądowi Słowa Bożego.',
      'Odpowiedź na Boże Słowo.',
      'Rozmowa końcowa.',
    ],
  },
  {
    phase: 'Po medytacji',
    intro:
      'Św. Ignacy proponuje, by przez kwadrans zastanowić się nad przebiegiem ' +
      'modlitwy. To nie jest rachunek sumienia — nie chodzi o drobiazgową analizę, ' +
      'lecz o zauważenie głównej myśli i wewnętrznych poruszeń.',
    points: [
      'Jak wyglądało moje osobiste zaangażowanie (wyciszenie, uwaga, hojność)?',
      'Co działo się we mnie? Co mnie szczególnie zastanowiło?',
      'Co Bóg chciał mi powiedzieć?',
      'Wnioski można później skonfrontować z kierownikiem duchowym.',
    ],
  },
];

export interface RetreatWeek {
  roman: string;
  title: string;
  summary: string;
  body: string;
}

export const retreatWeeks: RetreatWeek[] = [
  {
    roman: 'I',
    title: 'Tydzień pierwszy',
    summary: 'Spotkanie z miłosierną miłością Boga.',
    body:
      'Rekolekcje I Tygodnia są czasem spotkania z miłosierną miłością Boga. ' +
      'Poprzez modlitwę medytacyjną poznajemy naturę grzechu i jego skutki, ' +
      'a także własny grzech — wszystko w świetle miłości Boga, który uwalnia ' +
      'nas z niewoli i prowadzi do pojednania z Bogiem, innymi i samym sobą. ' +
      'Zachęca się tu do głębszego przeżycia sakramentu pojednania.',
  },
  {
    roman: 'II',
    title: 'Tydzień drugi',
    summary: 'Poznać Jezusa, aby lepiej Go kochać i naśladować.',
    body:
      'Po doświadczeniu oczyszczającej mocy Bożego miłosierdzia rekolektant ' +
      'szuka głębszego spotkania z Jezusem Chrystusem i prosi o dar Jego poznania. ' +
      'Podstawą modlitwy jest kontemplacja życia i działalności Jezusa, tak by ' +
      'Jego sposób myślenia, odczuwania i postępowania stawał się coraz bardziej ' +
      'własnym. To czas rozeznawania drogi życia i pogłębiania wiary.',
  },
  {
    roman: 'III',
    title: 'Tydzień trzeci',
    summary: 'Towarzyszyć Jezusowi w Jego Męce.',
    body:
      'Podczas III Tygodnia towarzyszymy Jezusowi w Jego Męce — jesteśmy przy ' +
      'cierpiącym Przyjacielu, uczymy się od cierpliwego Nauczyciela i próbujemy ' +
      'głębiej rozumieć dar Zbawienia. Towarzyszenie Mu w cierpieniu ma przede ' +
      'wszystkim otwierać nasze serca, umysły i wiarę na Jego Miłość do nas — ' +
      'to Ona jest przyczyną naszego zbawienia.',
  },
  {
    roman: 'IV',
    title: 'Tydzień czwarty',
    summary: 'Kontemplacja ku uzyskaniu miłości.',
    body:
      'Ostatnim ćwiczeniem drogi rekolekcji jest kontemplacja pomocna do ' +
      'uzyskania miłości. Oddajesz Bogu wszystko — pamięć, rozum i wolę — by ' +
      'mogło zostać przez Niego przemienione. Droga Ćwiczeń rozpoczyna się od ' +
      'zaproszenia Boga do siebie, byś na jej końcu mógł powierzyć się Jemu ' +
      'całkowicie i wrócić do codzienności przemieniony, zanurzony w miłości.',
  },
];

export interface ExamenStep {
  n: number;
  title: string;
  body: string;
}

/** Ignacjański rachunek sumienia — pięć punktów. */
export const examenSteps: ExamenStep[] = [
  {
    n: 1,
    title: 'Dziękczynienie',
    body:
      'Codzienną modlitwę zaczynamy od dziękowania Bogu za dobro, które czyni ' +
      'w naszym życiu. Zaczynamy od rzeczy prostych — od tego, co pierwsze ' +
      'przychodzi na myśl i za co rzeczywiście czujemy wdzięczność.',
  },
  {
    n: 2,
    title: 'Prośba o łaskę poznania',
    body:
      'Prosimy Ojca o łaskę patrzenia na swoje życie razem z Nim i widzenia ' +
      'siebie Jego oczami — w świetle Jego miłości, a nie jak przed surowym ' +
      'arbitrem. Prosimy też o poznanie tego, co daje nam życie.',
  },
  {
    n: 3,
    title: 'Badanie poruszeń — retrospekcja',
    body:
      'Przechodząc godzina po godzinie, przypominamy sobie miniony dzień — nie ' +
      'po to, by wiernie zrelacjonować wydarzenia, lecz by dostrzec momenty, ' +
      'w których Bóg zapraszał nas do współpracy z Jego łaską.',
  },
  {
    n: 4,
    title: 'Prośba o przebaczenie — modlitwa oddania',
    body:
      'Ze skruchą i pokorą prosimy Boga, aby przychodził nam z pomocą w naszej ' +
      'słabości. Zyskujemy bardziej realistyczny obraz samych siebie — dzieci ' +
      'Bożych, które potrzebują nieustannego wsparcia Bożej łaski.',
  },
  {
    n: 5,
    title: 'Postanowienie',
    body:
      'Kończymy postanowieniem: bardziej otwierać się na Bożą łaskę w konkretnych ' +
      'sytuacjach życia, tak by prowadziły nas Jego subtelne, łagodne poruszenia, ' +
      'a nie lęk czy skupienie na własnej korzyści.',
  },
];
