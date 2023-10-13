import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { birthDateToAge } from '@/utils/formatter';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Input, Radio, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  nik: string
  checkDate: string
  checkLocation: string
  medType: string
  medAmount: number
  ageCategory: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  checkDate: yup.string().required('Tanggal harus diisi!'),
  checkLocation: yup.string().required('Tempat pelayanan kesehatan harus diisi!'),
  medType: yup.string().required('Obat harus diisi!'),
  medAmount: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Jumlah pemberian harus diisi!'),
  ageCategory: yup.string().required('Umur harus diisi!'),
}).required();

interface FormDiarrheaProps {
  onSubmit: (value: IValues) => void;
}

const FormDiarrhea: React.FC<FormDiarrheaProps> = ({ onSubmit }) => {
  const { data = [], isLoading } = useSWR('/api/toddler/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch, setValue } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      checkDate: new Date().toISOString(),
      checkLocation: undefined,
      medType: '',
      medAmount: undefined,
      ageCategory: '',
    },
    resolver
  });
  const medType = watch('medType');

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
                options={data.map((item: any) => ({ label: item.name, value: item.nik, birthDate: item.birthDate }))}
                placeholder="Pilih nama balita"
                loading={isLoading}
                onSelect={(_value, option) => {
                  const age = birthDateToAge(option.birthDate, 'month');
                  setValue('ageCategory', +age <= 60 ? '<5' : '>5');
                }}
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
        <Controller
          control={control}
          name="checkLocation"
          render={({ field, fieldState }) => (
            <Field label="Lokasi Pengecekan" error={fieldState.error?.message}>
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
          name="medType"
          render={({ field, fieldState }) => (
            <Field label="Obat" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Oralit">Oralit</Radio>
                <Radio value="Zink">Zink</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        {!!medType && (
          <Controller
            control={control}
            name="medAmount"
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
          name="ageCategory"
          render={({ field, fieldState }) => (
            <Field label="Umur" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="<5">{'< 5 tahun'}</Radio>
                <Radio value=">5">{'> 5 tahun'}</Radio>
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