import { DatePicker, DatePickerProps } from 'antd';
import { PickerPanelDateProps } from 'antd/es/calendar/generateCalendar';
import dayjs from 'dayjs';
import React from 'react';

type Ref = any;

interface DatePickerBaseProps extends Omit<DatePickerProps, 'value' | 'onChange' | 'picker'> {
  value?: string;
  onChange?: (isodate: string) => void;
  showTime?: PickerPanelDateProps<any>['showTime'];
} 

const DatePickerBase = React.forwardRef<Ref, DatePickerBaseProps>(({ onChange, value, ...props}, ref) => {
  const dateValue = !!value && dayjs(value).isValid() ? dayjs(value) : null;

  return (
    <DatePicker
      ref={ref}
      format="DD/MM/YYYY"
      placeholder='DD/MM/YYYY'
      style={{ maxWidth: 660 }}
      {...props}
      value={dateValue}
      onChange={(date) => onChange?.(date?.toISOString() as string)}
    /> 
  );
});


DatePickerBase.displayName = 'DatePicker';

export default DatePickerBase;