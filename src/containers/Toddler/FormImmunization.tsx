import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Checkbox, Input, Radio, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  nik: string
  immunizationDate: string
  type: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  immunizationDate: yup.string().required('Tanggal harus diisi!'),
  type: yup.string().required('Jenis imunisasi harus diisi!'),
}).required();

interface FormImmunizationProps {
  onSubmit: (value: IValues) => void;
}

const FormImmunization: React.FC<FormImmunizationProps> = ({ onSubmit }) => {
  const { data = [], isLoading } = useSWR('/api/toddler/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      immunizationDate: new Date().toISOString(),
      type: undefined,
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
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16, flexGrow: 1 }}>
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            <Controller
              control={control}
              name="immunizationDate"
              render={({ field, fieldState }) => (
                <Field label="Tanggal Imunisasi" error={fieldState.error?.message}>
                  <DatePickerBase {...field} />
                </Field>
              )}
            />
            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            </div>
            <Controller
              control={control}
              name="type"
              render={({ field, fieldState }) => (
                <Field label="Jenis Imunisasi" error={fieldState.error?.message}>
                  <Select options={[{ label: 'Jenis imunisasi', value: 'value imunisiasi' }]} {...field} placeholder="Pilih jenis imunisasi" />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">Simpan</Button>
        </div>
      </div>
    </form>
  );
};

export default FormImmunization;