import React from 'react';
import { Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '@/utils/date';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

interface DataType {
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

const ListChildBirth: React.FC<{ nik: string }> = ({ nik = '' }) => {
  const { data, isLoading } = useSWR('/api/pregnant/list-child-birth', (url) => swrCallApi(url, { params: { nik } }));

  const columns: ColumnsType<DataType> = [
    {
      title: 'NIK',
      dataIndex: 'nik',
    },
    {
      title: 'Tanggal Persalinan',
      dataIndex: 'childBirthDate',
      render: (value) => formatDate(value, 'DD/MM/YYYY')
    },
    {
      title: 'Jenis Persalinan',
      dataIndex: 'childBirthType'
    },
    {
      title: 'Jenis Kelamin',
      dataIndex: 'gender'
    },
    {
      title: 'Berat Badan Lahir',
      dataIndex: 'weight',
      render: (value) => `${value} Kg`
    },
    {
      title: 'Tinggi Badan Lahir',
      dataIndex: 'height',
      render: (value) => `${value} Kg`
    },
    {
      title: 'Tempat Persalinan',
      dataIndex: 'childBirthLocation'
    },
    {
      title: 'KB Paska Salin',
      dataIndex: 'postChildBirth'
    },
    {
      title: 'Keterangan (Masalah / Komplikasi)',
      dataIndex: 'information'
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
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

export default ListChildBirth;
