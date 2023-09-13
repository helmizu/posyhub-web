import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export const formatDate = (date?: string | number | Date | dayjs.Dayjs, format: string = 'DD MM YYYY, HH:mm') => {
  if (!dayjs(date).isValid()) return '';
  return dayjs(date).format(format);
};