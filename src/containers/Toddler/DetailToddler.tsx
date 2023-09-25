import { formatDate } from '@/utils/date';
import { birthDateToAge } from '@/utils/formatter';
import { Descriptions, Layout, Tabs } from 'antd';
import type { DescriptionsItemType } from 'antd/es/descriptions';
import React from 'react';
import ListMonthlyCheck from './content/ListMonthlyCheck';

const MOCK_DATA = {
  '_id': '6509afddbc64143b7e1c109c',
  'nik': '211287021071',
  'name': 'Green Sweater',
  'birthDate': '2023-06-26T14:26:47.969Z',
  'motherName': 'Superwoman',
  'fatherName': 'Superman',
  'address': 'Jl. Raya Araya, Malang, Jawa Timur',
  'gender': 'Perempuan',
  'currentHeight': 0,
  'currentWeight': 0
};

const mapData = (value: typeof MOCK_DATA): DescriptionsItemType[] => {
  return [
    {
      key: 'name',
      label: 'Nama',
      children: value.name
    },
    {
      key: 'nik',
      label: 'NIK',
      children: value.nik
    },
    {
      key: 'gender',
      label: 'Jenis Kelamin',
      children: value.gender
    },
    {
      key: 'birthDate',
      label: 'Tanggal Lahir',
      children: formatDate(value.birthDate, 'DD/MM/YYYY')
    },
    {
      key: 'birthDate',
      label: 'Umur',
      children: birthDateToAge(value.birthDate)
    },
    {
      key: 'weight',
      label: 'BB (Kg) / TB (cm)',
      children: `${value.currentWeight} Kg / ${value.currentHeight} cm`
    },
    {
      key: 'fatherName',
      label: 'Nama Ayah',
      children: value.fatherName
    },
    {
      key: 'motherName',
      label: 'Nama Ibu',
      children: value.motherName
    },
    {
      key: 'address',
      label: 'Alamat',
      children: value.address
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
    children: () => <div>Daftar Laporan Imunisasi</div>
  },
  {
    key: 'diarrhea',
    label: 'Laporan Diare',
    children: () => <div>Daftar Laporan Diare</div>
  }
];

const DetailToddler: React.FC<{ data: typeof MOCK_DATA; }> = ({ data }) => {
  return (
    <Layout.Content>
      <Descriptions layout="vertical" items={mapData(data)} colon={false} />
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