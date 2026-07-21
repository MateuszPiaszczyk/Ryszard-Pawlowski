/** Treści strony głównej — cytaty i liczby biblijne. */

export interface Quote {
  text: string;
  author: string;
}

export const quotes: Quote[] = [
  {
    text: 'Milczenie jest jak odźwierny wewnętrznego życia.',
    author: 'św. Josemaría Escrivá',
  },
  {
    text:
      'Więcej Bóg przez godzinę nauczy w Manreza, niżby nauczyć mogli ' +
      'całego świata uczeni.',
    author: 'S. Ignat. vitae, l. 1',
  },
  {
    text: 'Ten Boga usłyszy, kto Go szuka w ciszy.',
    author: 'Adam Mickiewicz',
  },
];

export interface BiblicalNumber {
  value: string;
  label: string;
}

export const biblicalNumbers: BiblicalNumber[] = [
  { value: '3', label: 'Tyle razy szatan kusił Jezusa' },
  { value: '40', label: 'Dni Jezus pościł na pustyni' },
  { value: '33', label: 'Tyle lat miał Jezus w chwili ukrzyżowania' },
  { value: '12', label: 'Tylu apostołów miał Jezus' },
];
