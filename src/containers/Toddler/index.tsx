import React, { useState } from 'react';
import { Badge, Button, Card, Dropdown, Input, Modal, Table, Typography, theme } from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Column from '@/components/Column';
import { formatDate } from '@/utils/date';
import { birthDateToAge, toPercentage } from '@/utils/formatter';
import { UilEditAlt, UilEllipsisH, UilEye } from '@iconscout/react-unicons';
import FormToddler from './FormToddler';

interface DataType {
  _id: string
  nik: string
  name: string
  birthDate: string
  motherName: string
  fatherName: string
  birthWeight: number
  birthHeight: number
  address: string
  gender: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => <Column text={text} subtext={record.nik} />,
  },
  {
    title: 'Tanggal Lahir',
    dataIndex: 'birthDate',
    render: (value) => formatDate(value, 'DD/MM/YYYY')
  },
  {
    title: 'Umur',
    dataIndex: 'birthDate',
    render: (value) => birthDateToAge(value)
  },
  {
    title: 'BB (Kg) / TB (cm)',
    dataIndex: 'birthWeight',
    render: (value, record) => `${value} Kg / ${record.birthHeight} cm`
  },
  {
    title: 'Nama Ayah',
    dataIndex: 'fatherName',
  },
  {
    title: 'Nama Ibu',
    dataIndex: 'motherName',
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_, record) => (
      <Dropdown
        menu={{
          items: [
            {
              key: 'detail',
              label: 'Lihat Detail',
              icon: <UilEye size={16} />,
              onClick: () => console.log('view detail', record.nik)
            },
            {
              key: 'edit',
              label: 'Ubah',
              icon: <UilEditAlt size={16} />,
              onClick: () => console.log('edit', record.nik)
            },
          ]
        }}
      >
        <UilEllipsisH size={20} />
      </Dropdown>
    )
  },
];

const data: DataType[] = [
  {
    _id: '64fd642158bb96ffcb03069d',
    nik: '1234567890',
    name: 'John Doe',
    birthDate: '2000-01-01T00:00:00.000Z',
    motherName: 'Jane Doe',
    fatherName: 'John Doe Sr.',
    birthWeight: 3.5,
    birthHeight: 50,
    address: '123 Main Street',
    gender: 'Laki - laki'
  },
  {
    _id: '64fd642158bb96ffcb03069d',
    nik: '1234567890',
    name: 'John Doe',
    birthDate: '2000-01-01T00:00:00.000Z',
    motherName: 'Jane Doe',
    fatherName: 'John Doe Sr.',
    birthWeight: 3.5,
    birthHeight: 50,
    address: '123 Main Street',
    gender: 'Laki - laki'
  },
  {
    _id: '64fd642158bb96ffcb03069d',
    nik: '1234567890',
    name: 'John Doe',
    birthDate: '2000-01-01T00:00:00.000Z',
    motherName: 'Jane Doe',
    fatherName: 'John Doe Sr.',
    birthWeight: 3.5,
    birthHeight: 50,
    address: '123 Main Street',
    gender: 'Laki - laki'
  },
];

const ToddlerContainer = () => {
  const { token: { colorTextSecondary } } = theme.useToken();
  const [addBalita, setAddBalita] = useState(false);

  const onSubmitForm = (values: Partial<DataType>) => {
    console.log({ values });
  };

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <Typography.Title level={4}>Data Balita</Typography.Title>
      <div style={{ display: 'flex', gap: 16 }}>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Total Balita</Typography.Text>
          <Typography.Title level={5}>100</Typography.Title>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Balita Hadir {formatDate(new Date(), 'MMMM YYYY')}</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>11</Typography.Title>
            <Badge count={`${toPercentage(11 * 100 / 100)}%`} color="#697077" />
          </div>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Gizi Buruk</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>5</Typography.Title>
            <Badge count={`${toPercentage(5 * 100 / 100)}%`} color="#697077" />
          </div>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>-</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>-</Typography.Title>
            <Badge count={'-%'} color="#697077" />
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddBalita(true)}>Balita</Button>
          <Button type="primary" icon={<PlusOutlined />}>Hasil Pengecekan</Button>
          <Button type="primary" icon={<PlusOutlined />}>Laporan Diare</Button>
          <Button type="primary" icon={<PlusOutlined />}>Imunisasi</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Input.Search placeholder="Cari di sini..." />
          <Button icon={<PrinterOutlined />}>Cetak</Button>
        </div>
      </div>
      <Card bordered bodyStyle={{ padding: 0 }}>
        <Table
          rowKey={(record) => record.nik}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Modal
        title="Tambah Balita"
        open={addBalita}
        footer={null}
        onCancel={() => setAddBalita(false)}
      >
        <FormToddler onSubmit={onSubmitForm} />
      </Modal>
    </div>
  );
};

export default ToddlerContainer;