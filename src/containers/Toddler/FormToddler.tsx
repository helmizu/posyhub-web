import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Input, Radio } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
  nik: string
  name: string
  birthDate: string
  motherName: string
  fatherName: string
  birthWeight: number
  birthHeight: number
  address: string
  gender: string
  haveKMS: boolean
  economyStatus: string
}

const schemaValidation = yup.object({
  nik: yup.string().required('NIK harus diisi!'),
  name: yup.string().required('Nama harus diisi!'),
  birthDate: yup.string().required('Tanggal lahir harus diisi!'),
  motherName: yup.string().required('Nama ibu harus diisi!'),
  fatherName: yup.string().required('Nama ayah harus diisi!'),
  birthWeight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan lahir harus diisi!'),
  birthHeight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan lahir harus diisi!'),
  address: yup.string().required('Alamat harus diisi!'),
  gender: yup.string().required('Jenis kelamin harus diisi!'),
  haveKMS: yup.bool().required('Status kartu menuju sehat harus diisi!'),
  economyStatus: yup.string().required('Status ekonomi harus diisi!'),
}).required();

interface FormToddlerProps {
  defaultValues: IValues;
  onSubmit: (value: IValues) => void;
}

const FormToddler: React.FC<FormToddlerProps> = ({ onSubmit, defaultValues }) => {
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, formState } = useForm<IValues>({
    defaultValues: {
      nik: defaultValues?.nik,
      name: defaultValues?.name,
      birthDate: defaultValues?.birthDate,
      motherName: defaultValues?.motherName,
      fatherName: defaultValues?.fatherName,
      birthWeight: defaultValues?.birthWeight,
      birthHeight: defaultValues?.birthHeight,
      address: defaultValues?.address,
      gender: defaultValues?.gender,
      haveKMS: defaultValues?.haveKMS,
      economyStatus: defaultValues?.economyStatus,
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
            <Field label="NIK" error={fieldState.error?.message}>
              <Input
                {...field}
                onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                placeholder="357XXXXXXXXXXXXX"
                maxLength={16}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field label="Nama" error={fieldState.error?.message}>
              <Input {...field} placeholder="Kevin Mourel" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field, fieldState }) => (
            <Field label="Tanggal Lahir" error={fieldState.error?.message}>
              <DatePickerBase {...field} />
            </Field>
          )}
        />
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{ flex: 1 }}>
            <Controller
              control={control}
              name="birthWeight"
              render={({ field, fieldState }) => (
                <Field label="Berat Badan Lahir" error={fieldState.error?.message}>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.value?.replace(/\D+/g, ''))}
                    suffix="Kg"
                    placeholder="5"
                  />
                </Field>
              )}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Controller
              control={control}
              name="birthHeight"
              render={({ field, fieldState }) => (
                <Field label="Tinggi Badan Lahir" error={fieldState.error?.message}>
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
        </div>
        <Controller
          control={control}
          name="fatherName"
          render={({ field, fieldState }) => (
            <Field label="Nama Ayah" error={fieldState.error?.message}>
              <Input {...field} placeholder="Superman" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="motherName"
          render={({ field, fieldState }) => (
            <Field label="Nama Ibu" error={fieldState.error?.message}>
              <Input {...field} placeholder="Superwoman" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Field label="Alamat" error={fieldState.error?.message}>
              <Input.TextArea {...field} rows={4} placeholder="Jl. Araya Mansion No.8 - 22, Genitri, Tirtomoyo, Kec. Pakis, Kabupaten Malang, Jawa Timur 65154" />
            </Field>
          )}
        />
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
          name="economyStatus"
          render={({ field, fieldState }) => (
            <Field label="Status Ekonomi" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value="Gakin">Gakin</Radio>
                <Radio value="Non Gakin">Non Gakin</Radio>
              </Radio.Group>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="haveKMS"
          render={({ field, fieldState }) => (
            <Field label="Apakah punya kartu menuju sehat (KMS)?" error={fieldState.error?.message}>
              <Radio.Group {...field}>
                <Radio value={true}>Punya</Radio>
                <Radio value={false}>Tidak Punya</Radio>
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

export default FormToddler;