import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Checkbox, Radio, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

interface IValues {
  nik: string
  checkDate: string
  kbStatus: string
  kbType: string
  reason: string
  alokonType: string
  case: string
  dropout: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('NIK harus diisi!'),
  checkDate: yup.string().required('Tanggal harus diisi!'),
  kbStatus: yup.string().required('Status peserta KB harus diisi!'),
  kbType: yup.string().required('Tipe KB harus diisi!'),
  alokonType: yup.string().required('Jenis alokon harus diisi!'),
}).required();

interface FormKBProps {
  onSubmit: (value: IValues) => void;
}

const FormKB: React.FC<FormKBProps> = ({ onSubmit }) => {
  const { data = [], isLoading } = useSWR('/api/pregnant/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, formState } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      checkDate: new Date().toISOString(),
      kbStatus: undefined,
      kbType: undefined,
      reason: undefined,
      alokonType: undefined,
      case: undefined,
      dropout: undefined,
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
          name="checkDate"
          render={({ field, fieldState }) => (
            <Field label="Tanggal Lapor" error={fieldState.error?.message}>
              <DatePickerBase {...field} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="kbStatus"
          render={({ field, fieldState }) => (
            <Field label="Status Peserta KB" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Baru">Baru</Radio>
                <Radio value="Lama">Lama</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="kbType"
          render={({ field, fieldState }) => (
            <Field label="Tipe" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Pasca Salin">KB Pasca Salin</Radio>
                <Radio value="Pasca Keguguran">Pasca Keguguran</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="reason"
          render={({ field, fieldState }) => (
            <Field label="Alasan BerKB" error={fieldState.error?.message}>
              <Checkbox {...field} >
                PUS 4T
              </Checkbox>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="alokonType"
          render={({ field, fieldState }) => (
            <Field label="Jenis Alokon" error={fieldState.error?.message}>
              <Select
                {...field}
                style={{ width: '100%' }}
                placeholder="Pilih Jenis Alokon"
                options={[
                  { value: 'UID', label: 'UID' },
                  { value: 'Implant', label: 'Implant' },
                  { value: 'Suntik', label: 'Suntik' },
                  { value: 'PIL', label: 'PIL' },
                  { value: 'Kondom', label: 'Kondom' },
                  { value: 'Mow/Mop', label: 'Mow/Mop' },
                ]}
              />

            </Field>
          )}
        />
        <Controller
          control={control}
          name="case"
          render={({ field, fieldState }) => (
            <Field label="Kasus (Opsional)" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Kegagalan">Kegagalan</Radio>
                <Radio value="Efek Samping">Efek Samping</Radio>
                <Radio value="Komplikasi">Komplikasi</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="dropout"
          render={({ field, fieldState }) => (
            <Field label="Drop Out (Opsional)" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Hamil">Hamil</Radio>
                <Radio value="Menopouse">Menopouse</Radio>
              </Radio.Group>
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

export default FormKB;
