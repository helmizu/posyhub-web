import React from 'react';
import { Card, Table, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '@/utils/date';
import { birthDateToCheckDateAge } from '@/utils/formatter';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

interface DataType {
  _id: string
  nik: string
  immunizationDate: string
  type: string
}

const ListImmunization: React.FC<{ nik: string; birthDate: string }> = ({ nik = '', birthDate = '' }) => {
  const { data, isLoading } = useSWR('/api/toddler/list-immunization', (url) => swrCallApi(url, { params: { nik } }));

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tanggal Imunisasi',
      dataIndex: 'immunizationDate',
      render: (value) => formatDate(value, 'DD MMM YYYY'),
    },
    {
      title: 'Umur',
      dataIndex: 'immunizationDate',
      render: (value) => birthDateToCheckDateAge(birthDate, value),
    },
    {
      title: 'Jenis Imunisasi',
      dataIndex: 'type',
      render: (value) => value,
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

export default ListImmunization;