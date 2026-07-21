/** Dane biograficzne — strona „O mnie". Na podstawie oryginalnej strony. */

export interface BioEntry {
  key: string;
  heading: string;
  /** Krótki znacznik (data/rok) pokazywany na osi. */
  marker?: string;
  lines: string[];
}

export const bio: BioEntry[] = [
  {
    key: 'urodzenie',
    heading: 'Data i miejsce urodzenia',
    marker: '1962',
    lines: ['30 marca 1962 r.', 'Ostrołęka (Polska)'],
  },
  {
    key: 'edukacja',
    heading: 'Edukacja',
    marker: '1981–2000',
    lines: [
      'I Liceum Ogólnokształcące im. gen. J. Bema w Ostrołęce.',
      'Nowicjat SAC (1981–1983).',
      'Wyższe Seminarium Duchowne w Łomży (1984 – 27.05.1989).',
      'Studia z mariologii na „Marianum” w Rzymie (od 2000 r.).',
    ],
  },
  {
    key: 'swiecenia',
    heading: 'Święcenia kapłańskie',
    marker: '1989',
    lines: [
      '27 maja 1989 r.',
      'Katedra św. Michała Archanioła w Łomży.',
      'Święcenia z rąk bp. Juliusza Paetza.',
    ],
  },
  {
    key: 'duszpasterstwo',
    heading: 'Duszpasterstwo',
    marker: '1989–dziś',
    lines: [
      'Posługa w parafiach Diecezji Łomżyńskiej: Rutki, Ostrów Mazowiecka, Łomża, Jedwabne.',
      'W latach 1993–2017 posługa duszpasterska we Włoszech (Sycylia, Toskania, Lazio), m.in. jako administrator parafii w Civitella Marittima.',
      'Od 2010 r. współpracownik Diecezjalnego Duszpasterstwa Służby Zdrowia w Palestrinie oraz asystent egzorcysty diecezjalnego.',
      'Od 2017 r. posługa w Sanktuarium św. Antoniego Padewskiego w Ostrołęce; członek Polskiego Towarzystwa Mariologicznego.',
      'Od 2020 r. kapelan i opiekun duchowy Zakonu Rycerzy św. Jana Pawła II.',
    ],
  },
  {
    key: 'mariologia',
    heading: 'Mariologia i publikacje',
    marker: '2010',
    lines: [
      'Licencjat teologii w zakresie mariologii.',
      'Autor książki „Bolesna Królowa Polski. Il Santuario dell’Addolorata in Licheń: Storia e Spiritualità” (2010) — poświęconej historii i duchowości Sanktuarium Matki Bożej Bolesnej Królowej Polski w Licheniu.',
    ],
  },
];

export const languages = ['polski', 'włoski', 'rosyjski', 'angielski', 'łacina'];

export const interests = [
  'tenis stołowy',
  'tenis ziemny',
  'narciarstwo zjazdowe',
  'rekolekcje ignacjańskie',
  'turystyka religijna',
  'skauting',
  'muzyka klasyczna (Chopin, Mozart)',
  'literatura duchowa, psychologia, mariologia',
];

export const motto = {
  text:
    '„Chcemy jasno powiedzieć, że odejście od nauczania Kościoła lub milczenie ' +
    'na jego temat w celu zapewnienia opieki duszpasterskiej nie jest ani ' +
    'troską, ani duszpasterstwem. Tylko to, co prawdziwe, może być ostatecznie ' +
    'duszpasterskie.”',
  author: 'Joseph Ratzinger (Benedykt XVI)',
};
