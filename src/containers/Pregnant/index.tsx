import React, { useState } from 'react';
import {Badge, Button, Card, Dropdown, Input, Modal, Table, Typography, theme, message} from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Column from '@/components/Column';
import { formatDate } from '@/utils/date';
import { birthDateToAge, toPercentage } from '@/utils/formatter';
import { UilEditAlt, UilEllipsisH, UilEye } from '@iconscout/react-unicons';
import FormPregnant from './FormPregnant';
import FormKB from '@/containers/Pregnant/FormKB';
import FormChildBirth from '@/containers/Pregnant/FormChildBirth';
import useSWR from 'swr';
import callApi, {swrCallApi} from '@/utils/network';
import {AxiosRequestConfig} from 'axios';

interface DataType {
  _id: string
  nik: string
  name: string
  birthDate: string
  address: string
  phoneNumber: string
  pregnancyNumber: number
  estimatedBirth: string

}

const PregnantContainer = () => {
  const { token: { colorTextSecondary } } = theme.useToken();
  const [formKey, setFormKey] = useState<'' | 'profile' | 'child-birth' | 'kb'>('');
  const [nikFocus, setNikFocus] = useState('');
  const { data, mutate, isLoading } = useSWR('/api/pregnant/list', swrCallApi);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nama Ibu / Nama Suami',
      dataIndex: 'name',
      render: (text, record) => <Column text={text} subtext={record.nik} />,
    },
    {
      title: 'Usia',
      dataIndex: 'birthDate',
      render: (value) => birthDateToAge(value)
    },
    {
      title: 'Alamat Domisili',
      dataIndex: 'address',
    },
    {
      title: 'No HP / WA',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Hamil ke ... ',
      dataIndex: 'pregnancyNumber',
    },
    {
      title: 'Perkiraan Persalinan',
      dataIndex: 'estimatedBirth',
      render: (value) => formatDate(value, 'DD/MM/YYYY')
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
                onClick: () => {
                  setFormKey('profile');
                  setNikFocus(record.nik);
                }
              },
            ]
          }}
        >
          <UilEllipsisH size={20} />
        </Dropdown>
      )
    },
  ];

  const onCloseModal = () => {
    setFormKey('');
    setNikFocus('');
  };

  const onSubmitFormPregnant = async (values: any) => {
    try {
      const method = !nikFocus ? 'POST' : 'PUT';
      const url = !nikFocus ? '/api/pregnant/add' : `/api/pregnant/edit/${nikFocus}`;
      const options: AxiosRequestConfig = {
        method,
        url: url,
        data: values,
      };
      const addPregnant = await callApi(options);
      if (addPregnant) {
        mutate();
        onCloseModal();
        message.success(!nikFocus ? 'Tambah data ibu hamil berhasil!' : 'Ubah data ibu hamil berhasil!');
      }
    } catch (error) {
      message.error(!nikFocus ? 'Tambah data ibu hamil gagal!' : 'Ubah data hamil gagal!');
    }
  };

  const onSubmitFormChildBirth = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/pregnant/add-child-birth',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data persalinan ibu hamil berhasil!');
      }
    } catch (error) {
      message.error('Tambah data persalinan ibu hamil gagal!');
    }
  };

  const onSubmitFormKB = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/pregnant/add-kb',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data KB berhasil!');
      }
    } catch (error) {
      message.error('Tambah data KB gagal!');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <Typography.Title level={4}>Data Ibu Hamil</Typography.Title>
      <div style={{ display: 'flex', gap: 16 }}>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Total Ibu Hamil</Typography.Text>
          <Typography.Title level={5}>100</Typography.Title>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Ibu Hamil Hadir {formatDate(new Date(), 'MMMM YYYY')}</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>70</Typography.Title>
            <Badge count={`${toPercentage(70 * 100 / 100)}%`} color="#697077" />
          </div>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Ibu Hamil KEK</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>5</Typography.Title>
            <Badge count={`${toPercentage(5 * 100 / 100)}%`} color="#697077" />
          </div>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Belum Melahirkan</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>30</Typography.Title>
            <Badge count={`${toPercentage(30 * 100 / 100)}%`} color="#697077" />
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('profile')}>Ibu Hamil</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('child-birth')}>Persalinan</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('kb')}>KB</Button>
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
          loading={isLoading}
        />
      </Card>
      <Modal
        title="Tambah Ibu Hamil"
        open={formKey === 'profile'}
        footer={null}
        onCancel={onCloseModal}
      >
        <FormPregnant
          onSubmit={onSubmitFormPregnant}
          defaultValues={data?.find((user: any) => user.nik === nikFocus)} />
      </Modal>
      <Modal
        title="Tambah KB"
        open={formKey === 'kb'}
        footer={null}
        onCancel={onCloseModal}
      >
        <FormKB onSubmit={onSubmitFormKB} />
      </Modal>
      <Modal
        title="Tambah Persalinan"
        open={formKey === 'child-birth'}
        footer={null}
        onCancel={onCloseModal}
      >
        <FormChildBirth onSubmit={onSubmitFormChildBirth} />
      </Modal>
    </div>
  );
};

export default PregnantContainer;
