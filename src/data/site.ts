/**
 * Centralna konfiguracja serwisu.
 * Jedno źródło prawdy dla danych kontaktowych, metadanych i linków.
 */

export const site = {
  name: 'Ks. Ryszard Pawłowski',
  shortName: 'ks. R. Pawłowski',
  tagline: 'Rekolekcje ignacjańskie',
  legalName: 'Ryszard Pawłowski Rekolekcje',
  url: 'https://ryszardpawlowski.eu',
  locale: 'pl_PL',
  lang: 'pl',
  themeColor: '#12202c',

  description:
    'Ks. Ryszard Pawłowski — rekolekcje ignacjańskie, medytacja Słowa Bożego, ' +
    'Ćwiczenia Duchowe św. Ignacego Loyoli i towarzyszenie duchowe. ' +
    'Zatrzymaj się w ciszy i usłysz Boga.',

  defaultOgImage: '/og/og-image.jpg',

  contact: {
    email: 'ryszardpawlowski62@o2.pl',
    phone: '+48 731 052 705',
    phoneHref: '+48731052705',
  },

  social: {
    youtube: 'https://www.youtube.com/@SacRyszardPawlowski',
  },

  author: {
    name: 'Piaszczyk Studio',
    url: 'https://piaszczykstudio.pl/',
  },
} as const;

export type Site = typeof site;
