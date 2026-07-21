/** Zbiór linków do stron wartych uwagi (strona /linki). */

export interface ResourceLink {
  href: string;
  title: string;
  description: string;
}

export interface LinkGroup {
  heading: string;
  items: ResourceLink[];
}

export const linkGroups: LinkGroup[] = [
  {
    heading: 'Stolica Apostolska i Kościół w Polsce',
    items: [
      {
        href: 'https://vaticanstate.va/it/',
        title: 'Państwo Watykańskie',
        description: 'Oficjalny serwis Państwa Watykańskiego.',
      },
      {
        href: 'https://www.vatican.va/content/leo-xiv/pl.html',
        title: 'Nauczanie Papieża Leona XIV',
        description: 'Dokumenty i przemówienia Ojca Świętego (wersja polska).',
      },
      {
        href: 'https://episkopat.pl/',
        title: 'Konferencja Episkopatu Polski',
        description: 'Serwis Episkopatu Polski — dokumenty i komunikaty.',
      },
      {
        href: 'https://www.ekai.pl/',
        title: 'KAI — Katolicka Agencja Informacyjna',
        description: 'Aktualności ze świata Kościoła.',
      },
    ],
  },
  {
    heading: 'Duchowość ignacjańska i jezuici',
    items: [
      {
        href: 'https://manresa.jezuici.pl/',
        title: 'Manresa — jezuici',
        description: 'Portal poświęcony rekolekcjom i duchowości ignacjańskiej.',
      },
      {
        href: 'https://jezuici.pl',
        title: 'Towarzystwo Jezusowe',
        description: 'Oficjalny serwis Prowincji Polski Południowej Jezuitów.',
      },
      {
        href: 'https://dfdkalisz.jezuici.pl/',
        title: 'Dom Formacji Duchowej w Kaliszu',
        description: 'Rekolekcje w codzienności i Ćwiczenia Duchowe.',
      },
    ],
  },
  {
    heading: 'Sanktuaria, wspólnoty i modlitwa',
    items: [
      {
        href: 'https://www.faustinum.pl',
        title: 'Faustinum',
        description: 'Stowarzyszenie Apostołów Bożego Miłosierdzia.',
      },
      {
        href: 'https://koden.com.pl/',
        title: 'Sanktuarium w Kodniu',
        description: 'Sanktuarium Matki Bożej Kodeńskiej.',
      },
      {
        href: 'https://dobranowina.notion.site',
        title: 'Dobra Nowina',
        description: 'Materiały do rozważania Słowa Bożego.',
      },
      {
        href: 'https://www.dk.oaza.pl',
        title: 'Domowy Kościół',
        description: 'Ruch Światło–Życie, gałąź rodzinna.',
      },
    ],
  },
];
