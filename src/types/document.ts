export type TDocumentToddlerTemplate = 'balita' | 'ddtk' | 'diare' | 'imunisasi';
export type TDocumentPregantTemplate = 'bulananKB' | 'pregnant' | 'pregnantKEK' | 'rekapKB';
export type TDocumentTemplate = 'dashboard' | TDocumentToddlerTemplate | TDocumentPregantTemplate;

export const DOCUMENT_TODDLER: { key: TDocumentToddlerTemplate; label: string }[] = [
  {
    key: 'balita',
    label: 'Laporan Balita',
  },
  {
    key: 'ddtk',
    label: 'Laporan DDTK',
  },
  {
    key: 'diare',
    label: 'Laporan Diare',
  },
  {
    key: 'imunisasi',
    label: 'Laporan Imunisasi',
  }
];

export const DOCUMENT_PREGNANT: { key: TDocumentPregantTemplate; label: string }[] = [
  {
    key: 'bulananKB',
    label: 'Laporan Bulanan KB',
  },
  {
    key: 'pregnant',
    label: 'Laporan Ibu Hamil',
  },
  {
    key: 'pregnantKEK',
    label: 'Laporan Ibu Hamil KEK',
  },
  {
    key: 'rekapKB',
    label: 'Laporan Rekap KB',
  },
];
