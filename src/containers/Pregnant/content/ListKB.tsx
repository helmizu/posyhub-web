import React from 'react';
import { Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '@/utils/date';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

interface DataType {
  nik: string
  checkDate: string
  kbStatus: string
  kbType: string
  reason: string
  alokonType: string
  case: string
  dropout: string
}

const ListKB: React.FC<{ nik: string }> = ({ nik = '' }) => {
  const { data, isLoading } = useSWR('/api/pregnant/list-kb', (url) => swrCallApi(url, { params: { nik } }));

  const columns: ColumnsType<DataType> = [
    {
      title: 'NIK',
      dataIndex: 'nik',
    },
    {
      title: 'Tanggal Lapor',
      dataIndex: 'checkDate',
      render: (value) => formatDate(value, 'DD/MM/YYYY')
    },
    {
      title: 'Status Peserta KB',
      dataIndex: 'kbStatus'
    },
    {
      title: 'Tipe',
      dataIndex: 'kbStatus'
    },
    {
      title: 'Jenis Alokon',
      dataIndex: 'alokonType'
    },
    {
      title: 'Kasus',
      dataIndex: 'case'
    },
    {
      title: 'Drop Out',
      dataIndex: 'dropOut'
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

export default ListKB;
