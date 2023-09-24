import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import {Button, Input, Radio, Select} from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useSWR from 'swr';
import {swrCallApi} from '@/utils/network';

interface IValues {
  nik: string
  childBirthDate: string
  childBirthType: string
  gender: string
  weight: number
  height: number
  childBirthLocation: string
  postChildBirth: string
  information: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  childBirthDate: yup.string().required('Tanggal harus diisi!'),
  childBirthType: yup.string().required('Jenis persalinan harus diisi!'),
  gender: yup.string().required('Jenis kelamin harus diisi!'),
  weight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan harus diisi!'),
  height: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan harus diisi!'),
  childBirthLocation:yup.string().required('Tempat persalinan harus diisi!'),
  postChildBirth: yup.string().required('KB paska salin harus diisi!'),
}).required();

interface FormPersalinanProps {
  onSubmit: (value: IValues) => void;

}

const FormChildBirth: React.FC<FormPersalinanProps> = ({ onSubmit}) => {
  const { data = [], isLoading } = useSWR('/api/pregnant/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, formState } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      childBirthDate: new Date().toISOString(),
      childBirthType: undefined,
      gender: undefined,
      weight: undefined,
      height: undefined,
      childBirthLocation: undefined,
      postChildBirth: undefined,
      information: undefined,
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
                style={{ width: '100%' }}
                placeholder="Pilih nama ibu hamil"
                options={data.map((item: any) => ({ label: item.name, value: item.nik }))}
                loading={isLoading}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="childBirthDate"
          render={({ field, fieldState }) => (
            <Field label="Tanggal Persalinan" error={fieldState.error?.message}>
              <DatePickerBase {...field} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="childBirthType"
          render={({ field, fieldState }) => (
            <Field label="Jenis Persalinann" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Normal">Normal</Radio>
                <Radio value="SC / Operasi">SC / Operasi</Radio>
                <Radio value="Tindakan /  Vacum">Tindakan /  Vacum</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <Field label="Jenis Kelamin" error={fieldState.error?.message}>
                <Radio.Group {...field}>
                  <Radio value="Perempuan">Perempuan</Radio>
                  <Radio value="Laki - laki">Laki - laki</Radio>
                </Radio.Group>
              </Field>
            )}
          />
          <Controller
            control={control}
            name="weight"
            render={({ field, fieldState }) => (
              <Field label="Berat Badan Lahir" error={fieldState.error?.message}>
                <Input {...field} suffix="Kg" placeholder="5" />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="height"
            render={({ field, fieldState }) => (
              <Field label="Tinggi Badan Lahir" error={fieldState.error?.message}>
                <Input {...field} suffix="cm" placeholder="45" />
              </Field>
            )}
          />
        </div>
        <Controller
          control={control}
          name="childBirthLocation"
          render={({ field, fieldState }) => (
            <Field label="Tempat Persalinan" error={fieldState.error?.message}>
              <Input {...field} placeholder="Rumah Sakit Ibu dan Anak" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="postChildBirth"
          render={({ field, fieldState }) => (
            <Field label="KB Paska Salin" error={fieldState.error?.message}>
              <Input {...field} placeholder="" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="information"
          render={({ field, fieldState }) => (
            <Field label="Keterangan (Masalah / Komplikasi)" error={fieldState.error?.message}>
              <Input {...field} placeholder=" " />
            </Field>
          )}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit" loading={formState.isSubmitting}>Simpan</Button>
        </div>
      </div>
    </form>
  );
};

export default FormChildBirth;
