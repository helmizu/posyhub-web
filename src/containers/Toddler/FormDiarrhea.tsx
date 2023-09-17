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
  location: string
  medicine: string
  amount: number
  age: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  date: yup.string().required('Tanggal harus diisi!'),
  location: yup.string().required('Tempat pelayanan kesehatan harus diisi!'),
  medicine: yup.string().required('Obat harus diisi!'),
  amount: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Jumlah pemberian harus diisi!'),
  age: yup.string().required('Umur harus diisi!'),
}).required();

interface FormDiarrheaProps {
  onSubmit: (value: IValues) => void;
}

const FormDiarrhea: React.FC<FormDiarrheaProps> = ({ onSubmit }) => {
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      date: new Date().toISOString(),
      location: undefined,
      medicine: '',
      amount: undefined,
      age: '',
    },
    resolver
  });
  const medicine = watch('medicine');

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
        <Controller
          control={control}
          name="location"
          render={({ field, fieldState }) => (
            <Field label="" error={fieldState.error?.message}>
              <>
                <Radio.Group {...field}>
                  <Radio value="PUSK">PUSK</Radio>
                  <Radio value="PUSTU">PUSTU</Radio>
                  <Radio checked={!['PUSK', 'PUSTU', undefined].includes(field.value)} value={!['PUSK', 'PUSTU', undefined].includes(field.value) ? field.value : ''}>Lainnya</Radio>
                </Radio.Group>
                {!['PUSK', 'PUSTU', undefined].includes(field.value) && (
                  <Input {...field} disabled={['PUSK', 'PUSTU', undefined].includes(field.value)} placeholder="Lainnya" />
                )}
              </>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="medicine"
          render={({ field, fieldState }) => (
            <Field label="Obat" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Oralit">Oralit</Radio>
                <Radio value="Zink">Zink</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        {!!medicine && (
          <Controller
            control={control}
            name="amount"
            render={({ field, fieldState }) => (
              <Field label="" error={fieldState.error?.message}>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                  placeholder="Jumlah Pemberian"
                />
              </Field>
            )}
          />
        )}
        <Controller
          control={control}
          name="age"
          render={({ field, fieldState }) => (
            <Field label="Umur" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="< 5 tahun">{'< 5 tahun'}</Radio>
                <Radio value="> 5 tahun">{'> 5 tahun'}</Radio>
              </Radio.Group>
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

export default FormDiarrhea;