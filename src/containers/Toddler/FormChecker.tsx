import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Checkbox, Input, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  nik: string
  checkDate: string
  weight: number
  height: number
  headCircumference: number
  upperArmCircumference: number
  pmt: boolean
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  checkDate: yup.string().required('Tanggal harus diisi!'),
  weight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan harus diisi!'),
  height: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan harus diisi!'),
  headCircumference: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar kepala (headCircumference) harus diisi!'),
  upperArmCircumference: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar lengan atas (upperArmCircumference) harus diisi!'),
  pmt: yup.boolean(),
}).required();

interface FormCheckerProps {
  onSubmit: (value: IValues) => void;
}

const FormChecker: React.FC<FormCheckerProps> = ({ onSubmit }) => {
  const { data = [], isLoading } = useSWR('/api/toddler/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      checkDate: new Date().toISOString(),
      weight: undefined,
      height: undefined,
      headCircumference: undefined,
      upperArmCircumference: undefined,
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
              <Select
                {...field}
                options={data.map((item: any) => ({ label: item.name, value: item.nik }))}
                placeholder="Pilih nama balita"
                loading={isLoading}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="checkDate"
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
            name="headCircumference"
            render={({ field, fieldState }) => (
              <Field label="Lingkar Kepala (headCircumference)" error={fieldState.error?.message}>
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
            name="upperArmCircumference"
            render={({ field, fieldState }) => (
              <Field label="Lingkar Lengan Atas (upperArmCircumference)" error={fieldState.error?.message}>
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