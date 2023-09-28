import { formatDate } from '@/utils/date';
import { Descriptions, Layout, Tabs } from 'antd';
import type { DescriptionsItemType } from 'antd/es/descriptions';
import React from 'react';
import ListKB from '@/containers/Pregnant/content/ListKB';
import ListChildBirth from '@/containers/Pregnant/content/ListChildBirth';

const DetailChildBirth: React.FC<{ data: any }> = ({ data }) => {

  const TABS = [
    {
      key: 'immunization',
      label: 'Laporan Persalinan',
      children: () => <ListChildBirth nik={data.nik} />
    },
    {
      key: 'diarrhea',
      label: 'Laporan KB',
      children: () => <ListKB nik={data.nik} />
    }
  ];


  const mapData = (value: typeof data): DescriptionsItemType[] => {
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
        key: 'birthDate',
        label: 'Tanggal Lahir',
        children: formatDate(value?.birthDate, 'DD/MM/YYYY')
      },
      {
        key: 'address',
        label: 'Alamat',
        children: value?.address
      },
      {
        key: 'phoneNumber',
        label: 'No HP / WA',
        children: value?.phoneNumber
      },
      {
        key: 'economyStatus',
        label: 'Status Ekonomi',
        children: value?.economyStatus
      },
      {
        key: 'pregnancyNumber',
        label: 'Hamil ke ',
        children: value?.pregnancyNumber
      },
      {
        key: 'youngestChildAge',
        label: 'Usia Anak Terkecil',
        children: value?.youngestChildAge
      },
      {
        key: 'lastPeriod',
        label: 'Haid Terakhir (HPHT)',
        children: formatDate(value?.lastPeriod, 'DD/MM/YYYY')
      },
      {
        key: 'estimatedBirth',
        label: 'Perkiraan Persalinan (PHL)',
        children: formatDate(value?.estimatedBirth, 'DD/MM/YYYY')
      },
      {
        key: 'weight',
        label: 'Berat Badan',
        children: value?.weight + 'Kg'
      },
      {
        key: 'height',
        label: 'Tinggi Badan',
        children: value?.height + 'Cm'
      },
      {
        key: 'bloodPressure',
        label: 'Tensi',
        children: value?.bloodPressure
      },
      {
        key: 'upperArmCircumference',
        label: 'Lingkat Lengan Atas (LILA)',
        children: value?.upperArmCircumference
      },
      {
        key: 'bloodType',
        label: 'Golongan Darah',
        children: value?.bloodType
      },
      {
        key: 'score',
        label: 'Skor Pudji Rochyati',
        children: value?.score
      },
      {
        key: 'immunizationStatus',
        label: 'Status Imunisasi',
        children: value?.immunizationStatus ? 'Sudah Imunisasi' : 'Belum Imunisasi'
      },
    ];
  };

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

export default DetailChildBirth;
