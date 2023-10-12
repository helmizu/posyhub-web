import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import {Button, Checkbox, Input, Select} from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
  nik: string
  name: string
  birthDate: string
  address: string
  phoneNumber: string
  economyStatus: string
  pregnancyNumber: number
  youngestChildAge: number
  lastPeriod: string
  estimatedBirth: string
  weight: number
  height: number
  bloodPressure: number
  upperArmCircumference: number
  bloodType: string
  score: number
  immunizationStatus: boolean
}

const schemaValidation = yup.object({
  nik: yup.string().required('NIK harus diisi!'),
  name: yup.string().required('Nama harus diisi!'),
  birthDate: yup.string().required('Tanggal lahir harus diisi!'),
  address: yup.string().required('Alamat harus diisi!'),
  phoneNumber: yup.string().required('Nomor HP / WA harus diisi!'),
  economyStatus: yup.string().required('Status ekonomi harus diisi!'),
  pregnancyNumber: yup.string().required('Jumlah hamil harus diisi!'),
  husbandName: yup.string().required('Nama suami harus diisi!'),
  youngestChildAge: yup.string().required('Umur anak terakhir harus diisi!'),
  lastPeriod: yup.string().required('Haid terakhir harus diisi!'),
  estimatedBirth: yup.string().required('Perkiraan persalinan harus diisi!'),
  weight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan harus diisi!'),
  height: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan harus diisi!'),
  bloodPressure: yup.string().required('Tensi harus diisi!'),
  upperArmCircumference: yup.string().required('Lingkat lengan atas harus diisi!'),
  bloodType: yup.string().required('Golongan darah harus diisi!'),
  score: yup.string().required('Skor Pudji Rochyati harus diisi!'),
}).required();

interface FormPregnantProps {
  onSubmit: (value: IValues) => void;
  defaultValues: IValues;
}

const FormPregnant: React.FC<FormPregnantProps> = ({ onSubmit, defaultValues }) => {
  const resolver = useYupValidationResolver(schemaValidation);

  const { control, handleSubmit, formState } = useForm<IValues>({
    defaultValues: {
      nik: defaultValues?.nik,
      name: defaultValues?.name,
      birthDate: defaultValues?.birthDate,
      address: defaultValues?.address,
      husbandName: defaultValues?.husbandName,
      phoneNumber: defaultValues?.phoneNumber,
      economyStatus: defaultValues?.economyStatus,
      pregnancyNumber: defaultValues?.pregnancyNumber,
      youngestChildAge: defaultValues?.youngestChildAge,
      lastPeriod: defaultValues?.lastPeriod,
      estimatedBirth: defaultValues?.estimatedBirth,
      weight: defaultValues?.weight,
      height: defaultValues?.height,
      bloodPressure: defaultValues?.bloodPressure,
      upperArmCircumference: defaultValues?.upperArmCircumference,
      bloodType: defaultValues?.bloodType,
      score: defaultValues?.score,
      immunizationStatus: defaultValues?.immunizationStatus,
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
              <Input {...field} placeholder="357XXXXXXXXXXXXX" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field label="Nama" error={fieldState.error?.message}>
              <Input {...field} placeholder="Pratiwi" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="husbandName"
          render={({ field, fieldState }) => (
            <Field label="Nama Suami" error={fieldState.error?.message}>
              <Input {...field} placeholder="Joko" />
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
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Field label="Alamat" error={fieldState.error?.message}>
              <Input.TextArea {...field} rows={4} placeholder="Jl. Araya Mansion No.8 - 22, Genitri, Tirtomoyo, Kec. Pakis, Kabupaten Malang, Jawa Timur 65154" />
            </Field>
          )}
        />
        <div style={{ display: 'flex', gap: 16, flexGrow: 2 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <Field label="No HP / WA" error={fieldState.error?.message}>
                  <Input {...field} placeholder="+62XXXXXXXX" />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="economyStatus"
              render={({ field, fieldState }) => (
                <Field label="Status Ekonomi" error={fieldState.error?.message}>
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="Pilih Status Ekonomi"
                    options={[
                      { value: 'Gakin', label: 'Gakin' },
                      { value: 'Non Gakin', label: 'Non Gakin' },
                    ]}
                  />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="pregnancyNumber"
              render={({ field, fieldState }) => (
                <Field label="Hamil Ke" error={fieldState.error?.message}>
                  <Input {...field} placeholder="2" />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="youngestChildAge"
              render={({ field, fieldState }) => (
                <Field label="Usia Anak Terkecil" error={fieldState.error?.message}>
                  <Input {...field} placeholder="12" />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="lastPeriod"
              render={({ field, fieldState }) => (
                <Field label="Haid Terakhir (HPHT)" error={fieldState.error?.message}>
                  <DatePickerBase {...field} />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="estimatedBirth"
              render={({ field, fieldState }) => (
                <Field label="Perkiraan Persalinan (PHL)" error={fieldState.error?.message}>
                  <DatePickerBase {...field} />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="weight"
              render={({ field, fieldState }) => (
                <Field label="Berat Badan" error={fieldState.error?.message}>
                  <Input {...field} suffix="Kg" placeholder="5" />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="height"
              render={({ field, fieldState }) => (
                <Field label="Tinggi Badan" error={fieldState.error?.message}>
                  <Input {...field} suffix="cm" placeholder="45" />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="bloodPressure"
              render={({ field, fieldState }) => (
                <Field label="Tensi" error={fieldState.error?.message}>
                  <Input {...field} placeholder="90/60" />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="upperArmCircumference"
              render={({ field, fieldState }) => (
                <Field label="Lingkat Lengan Atas (LILA)" error={fieldState.error?.message}>
                  <Input {...field} suffix="cm" placeholder="50" />
                </Field>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="bloodType"
              render={({ field, fieldState }) => (
                <Field label="Golongan Darah" error={fieldState.error?.message}>
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="Pilih Golongan Darah"
                    options={[
                      { value: 'A', label: 'A' },
                      { value: 'B', label: 'B' },
                      { value: 'AB', label: 'AB' },
                      { value: 'O', label: 'O' },
                    ]}
                  />
                </Field>
              )}
            />
          </div>
          <div style={{width: '50%'}}>
            <Controller
              control={control}
              name="score"
              render={({ field, fieldState }) => (
                <Field label="Skor Pudji Rochyati" error={fieldState.error?.message}>
                  <Input {...field} placeholder="90" />
                </Field>
              )}
            />
          </div>

        </div>

        <Controller
          control={control}
          name="immunizationStatus"
          render={({ field, fieldState }) => (
            <Field label="Status Imunisasi Tetanus" error={fieldState.error?.message}>
              <Checkbox {...field} >
                                Sudah Imunisasi
              </Checkbox>
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

export default FormPregnant;
