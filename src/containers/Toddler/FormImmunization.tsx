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
  immunization: string
  height: number
  lk: number
  lila: number
  pmt: boolean
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  date: yup.string().required('Tanggal harus diisi!'),
  immunization: yup.string().required('Jenis imunisasi harus diisi!'),
}).required();

interface FormImmunizationProps {
  onSubmit: (value: IValues) => void;
}

const FormImmunization: React.FC<FormImmunizationProps> = ({ onSubmit }) => {
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      date: new Date().toISOString(),
      immunization: undefined,
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
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
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
            name="immunization"
            render={({ field, fieldState }) => (
              <Field label="Jenis Imunisasi" error={fieldState.error?.message}>
                <Select options={[{ label: 'Jenis imunisasi', value: 'value imunisiasi' }]} {...field} placeholder="Pilih jenis imunisasi" />
              </Field>
            )}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">Simpan</Button>
        </div>
      </div>
    </form>
  );
};

export default FormImmunization;