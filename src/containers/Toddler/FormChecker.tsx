import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Checkbox, Input, Radio, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
  nik: string
  date: string
  weight: number
  height: number
  lk: number
  lila: number
  pmt: boolean
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  date: yup.string().required('Tanggal harus diisi!'),
  weight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan harus diisi!'),
  height: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan harus diisi!'),
  lk: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar kepala (LK) harus diisi!'),
  lila: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar lengan atas (LILA) harus diisi!'),
  pmt: yup.boolean(),
}).required();

interface FormCheckerProps {
  onSubmit: (value: IValues) => void;
}

const FormChecker: React.FC<FormCheckerProps> = ({ onSubmit }) => {
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      date: new Date().toISOString(),
      weight: undefined,
      height: undefined,
      lk: undefined,
      lila: undefined,
      pmt: false,
    },
    resolver
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Controller
          control={control}
          name="nik"
          render={({ field, fieldState }) => (
            <Field label="Nama" error={fieldState.error?.message}>
              <Select options={[{ label: 'name', value: 'nik' }]} {...field} placeholder="Pilih nama balita" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <Field label="Tanggal Pengecekan" error={fieldState.error?.message}>
              <DatePickerBase {...field} />
            </Field>
          )}
        />
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <Controller
            control={control}
            name="weight"
            render={({ field, fieldState }) => (
              <Field label="Berat Badan" error={fieldState.error?.message}>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                  suffix="Kg"
                  placeholder="5"
                />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="height"
            render={({ field, fieldState }) => (
              <Field label="Tinggi Badan" error={fieldState.error?.message}>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                  suffix="cm"
                  placeholder="45"
                />
              </Field>
            )}
          />
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <Controller
            control={control}
            name="lk"
            render={({ field, fieldState }) => (
              <Field label="Lingkar Kepala (LK)" error={fieldState.error?.message}>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                  suffix="cm"
                  placeholder="14"
                />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="lila"
            render={({ field, fieldState }) => (
              <Field label="Lingkar Lengan Atas (LILA)" error={fieldState.error?.message}>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                  suffix="cm"
                  placeholder="6"
                />
              </Field>
            )}
          />
        </div>
        <Controller
          control={control}
          name="pmt"
          render={({ field, fieldState }) => (
            <Field label="" error={fieldState.error?.message}>
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Pemberian Makanan Tambahan (PMT)
              </Checkbox>
            </Field>
          )}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">Simpan</Button>
        </div>
      </div>
    </form>
  );
};

export default FormChecker;