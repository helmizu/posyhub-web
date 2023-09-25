import React from 'react';
import { Card, Table, Typography, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '@/utils/date';
import { birthDateToCheckDateAge } from '@/utils/formatter';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

interface DataType {
  _id: string
  nik: string
  checkDate: string
  weight: number
  height: number
  headCircumference: number
  upperArmCircumference: number
  constantWeight: boolean
  exclusiveMilk: boolean
  weightStatus: string
  pmt: boolean
}

const ListMonthlyCheck: React.FC<{ nik: string; birthDate: string }> = ({ nik = '', birthDate = '' }) => {
  const { data, isLoading } = useSWR('/api/toddler/list-check', (url) => swrCallApi(url, { params: { nik } }));

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tanggal',
      dataIndex: 'checkDate',
      render: (value) => formatDate(value, 'MMM YYYY'),
    },
    {
      title: 'Umur',
      dataIndex: 'checkDate',
      render: (value) => birthDateToCheckDateAge(birthDate, value)
    },
    {
      title: 'Berat Badan (Kg)',
      dataIndex: 'weight',
      render: (value) => `${value} Kg`
    },
    {
      title: 'Tinggi Badan (cm)',
      dataIndex: 'height',
      render: (value) => `${value} cm`
    },
    {
      title: 'LILA (cm)',
      dataIndex: 'upperArmCircumference',
      render: (value) => `${value} cm`
    },
    {
      title: 'LK (cm)',
      dataIndex: 'headCircumference',
      render: (value) => `${value} cm`
    },
    {
      title: 'BBSK/BBK/BBL',
      dataIndex: 'weightStatus',
      render: value => value
    },
    {
      title: 'ASI Ekslusif',
      dataIndex: 'exclusiveMilk',
      render: value => value ? 'Iya' : 'Tidak'
    },
    {
      title: 'PMT',
      dataIndex: 'pmt',
      render: value => value ? 'Iya' : 'Tidak'
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      {/* <Typography.Title level={4}>Data Pengecekan Bulanan</Typography.Title> */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Input.Search placeholder="Cari di sini..." />
          <Button icon={<PrinterOutlined />}>Cetak</Button>
        </div>
      </div> */}
      <Card bordered bodyStyle={{ padding: 0 }}>
        <Table
          rowKey={(record) => record.nik}
          columns={columns}
          dataSource={data}
          loading={isLoading}
        />
      </Card>
    </div>
  );
};

export default ListMonthlyCheck;