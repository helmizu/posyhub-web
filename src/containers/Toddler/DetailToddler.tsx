import { formatDate } from '@/utils/date';
import { birthDateToAge } from '@/utils/formatter';
import { Descriptions, Layout, Tabs } from 'antd';
import type { DescriptionsItemType } from 'antd/es/descriptions';
import React from 'react';
import ListMonthlyCheck from './content/ListMonthlyCheck';
import ListImmunization from './content/ListImmunization';
import ListDiarrhea from './content/ListDiarrhea';

const MOCK_DATA = {
  '_id': '6509afddbc64143b7e1c109c',
  'nik': '211287021071',
  'name': 'Green Sweater',
  'birthDate': '2023-06-26T14:26:47.969Z',
  'motherName': 'Superwoman',
  'fatherName': 'Superman',
  'address': 'Jl. Raya Araya, Malang, Jawa Timur',
  'gender': 'Perempuan',
  'height': 0,
  'weight': 0
};

const mapData = (value: typeof MOCK_DATA): DescriptionsItemType[] => {
  return [
    {
      key: 'name',
      label: 'Nama',
      children: value?.name
    },
    {
      key: 'nik',
      label: 'NIK',
      children: value?.nik
    },
    {
      key: 'gender',
      label: 'Jenis Kelamin',
      children: value?.gender
    },
    {
      key: 'birthDate',
      label: 'Tanggal Lahir',
      children: formatDate(value?.birthDate, 'DD/MM/YYYY')
    },
    {
      key: 'birthDate',
      label: 'Umur',
      children: birthDateToAge(value?.birthDate)
    },
    {
      key: 'weight',
      label: 'BB (Kg) / TB (cm)',
      children: `${value?.weight} Kg / ${value?.height} cm`
    },
    {
      key: 'fatherName',
      label: 'Nama Ayah',
      children: value?.fatherName
    },
    {
      key: 'motherName',
      label: 'Nama Ibu',
      children: value?.motherName
    },
    {
      key: 'address',
      label: 'Alamat',
      children: value?.address
    }
  ];
};

const TABS = [
  {
    key: 'check',
    label: 'Pengecekan Bulanan',
    children: ListMonthlyCheck
  },
  {
    key: 'immunization',
    label: 'Laporan Imunisasi',
    children: ListImmunization
  },
  {
    key: 'diarrhea',
    label: 'Laporan Diare',
    children: ListDiarrhea
  }
];

const DetailToddler: React.FC<{ data: typeof MOCK_DATA; }> = ({ data }) => {
  return (
    <Layout.Content>
      <div style={{ paddingBlock: 8 }}>
        <Descriptions title="" labelStyle={{ marginBottom: -8 }} layout="vertical" items={mapData(data)} colon={false} />
      </div>
      <Tabs
        defaultActiveKey="check"
        type="card"
        size="large"
        items={TABS.map(({ key, label, children: Content }) => ({ key, label, children: <Content {...data} /> }))}
      />
    </Layout.Content>
  );
};

export default DetailToddler;