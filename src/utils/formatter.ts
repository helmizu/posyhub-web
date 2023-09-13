import dayjs from 'dayjs';

export const toPercentage = (value: number) => Number(value.toFixed(2).replace(/[.,]00$/, ''));

export const toIdr = (value: number, negative: any = 'Rp 0') => {
  if (typeof value === 'number' || typeof value === 'string') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  }

  return negative;
};

export const birthDateToAge = (birthDate: string) => {
  const monthDiff = dayjs(new Date()).diff(birthDate, 'month');
  const year = Math.floor(monthDiff / 12);
  const month = monthDiff % 12;
  
  if (year) return `${year} tahun ${month} bulan`;
  return `${month} bulan`; 
};
