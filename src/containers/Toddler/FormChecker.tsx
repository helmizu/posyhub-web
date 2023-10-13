import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { formatDate } from '@/utils/date';
import callApi, { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Checkbox, Descriptions, Input, Modal, Select, Typography } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
  exclusiveMilk: boolean
}

const schemaValidation = yup.object({
  nik: yup.string().required('Nama harus diisi!'),
  checkDate: yup.string().required('Tanggal harus diisi!'),
  weight: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Berat badan harus diisi!'),
  height: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Tinggi badan harus diisi!'),
  headCircumference: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar kepala (headCircumference) harus diisi!'),
  upperArmCircumference: yup.number().transform(val => Number.isNaN(+val) ? undefined : val).required('Lingkar lengan atas (upperArmCircumference) harus diisi!'),
  exclusiveMilk : yup.boolean(),
}).required();

interface FormCheckerProps {
  onSubmit: (value: IValues) => void;
  onUpdate: (nik: string, value: IValues) => void;
}

const mapDescriptions = (value: IValues): DescriptionsItemType[] => {
  return [
    {
      key: 'name',
      label: 'Nama',
      children: value?.nik
    },
    { children: '' },
    {
      key: 'checkDate',
      label: 'Tanggal Pengecekan',
      children: formatDate(value?.checkDate, 'DD/MM/YYYY')
    },
    { children: '' },
    {
      key: 'weight',
      label: 'Berat Badan (Kg)',
      children: `${value?.weight} Kg`
    },
    {
      key: 'height',
      label: 'Tinggi Badan (cm)',
      children: `${value?.height} cm`
    },
    {
      key: 'lk',
      label: 'Lingkar Kepala (cm)',
      children: `${value?.headCircumference} Kg`
    },
    {
      key: 'height',
      label: 'Tinggi Badan (cm)',
      children: `${value?.upperArmCircumference} cm`
    },
    {
      key: 'pmt',
      label: 'PMT',
      children: `${value?.pmt ? 'Iya' : 'Tidak'}`
    },
    {
      key: 'exclusiveMilk',
      label: 'ASI Eksklusif',
      children: `${value?.pmt ? 'Iya' : 'Tidak'}`
    },
  ];
};

const FormChecker: React.FC<FormCheckerProps> = ({ onSubmit, onUpdate }) => {
  const { data = [], isLoading } = useSWR('/api/toddler/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch } = useForm<IValues>({
    defaultValues: {
      nik: undefined,
      checkDate: new Date().toISOString(),
      weight: undefined,
      height: undefined,
      headCircumference: undefined,
      upperArmCircumference: undefined,
      pmt: false,
      exclusiveMilk: false,
    },
    resolver
  });

  const [history, setHistory] = useState([]);
  const $nik = watch('nik');
  const $name = $nik ? data?.find((item: any) => item.nik === $nik).name : '';
  const [duplicated, setDuplicated] = useState<null | IValues>(null);
  const getHistory = async (nik = '') => {
    if (!nik) return;
    try {
      const data = await callApi({
        method: 'GET',
        params: { nik },
        url: '/api/toddler/list-check'
      });
      if (data) setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateBeforeSubmit = (value: IValues) => {
    const duplicatedData = history?.find((item: IValues) => dayjs(item.checkDate).isSame(value?.checkDate, 'M'));
    const hasDuplicated = !!duplicatedData;
    if (hasDuplicated) return setDuplicated(duplicatedData);
    return onSubmit(value);
  };

  useEffect(() => {
    getHistory($nik);
  }, [$nik]);

  return (
    <>
      <form onSubmit={handleSubmit(validateBeforeSubmit)} id="toddler-checker">
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
            <div style={{ flex: 1 }}>
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
            </div>
            <div style={{ flex: 1 }}>
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
          </div>
          <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
            <div style={{ flex: 1 }}>
              <Controller
                control={control}
                name="headCircumference"
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
            </div>
            <div style={{ flex: 1 }}>
              <Controller
                control={control}
                name="upperArmCircumference"
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
          <Controller
            control={control}
            name="exclusiveMilk"
            render={({ field, fieldState }) => (
              <Field label="" error={fieldState.error?.message}>
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  ASI Eksklusif
                </Checkbox>
              </Field>
            )}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit">Simpan</Button>
          </div>
        </div>
      </form>
      <Modal
        open={!!duplicated}
        title="Data duplikasi"
        onCancel={() => setDuplicated(null)}
        footer={[
          <Button key="update" type="primary" onClick={handleSubmit((value) => onUpdate($nik, value))}>Perbarui</Button>,
          <Button key="close" type="default" onClick={() => setDuplicated(null)}>Ubah</Button>
        ].reverse()}
      >
        <Typography.Paragraph>
          Data pengecekan <b>{$name}</b> di bulan <b>{formatDate(duplicated?.checkDate, 'MMM YYYY')}</b> telah tersimpan seperti rincian di bawah, apakah anda ingin memperbaruinya?
        </Typography.Paragraph>
        <Descriptions
          layout="vertical"
          column={2}
          colon={false}
          labelStyle={{ marginBottom: -8 }}
          items={mapDescriptions(duplicated!)}
        />
      </Modal>
    </>
  );
};

export default FormChecker;