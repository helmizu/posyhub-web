import React, { useState } from 'react';
import { Badge, Button, Card, Dropdown, Input, Modal, Table, Typography, message, theme } from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Column from '@/components/Column';
import { formatDate } from '@/utils/date';
import { birthDateToAge, toPercentage } from '@/utils/formatter';
import { UilEditAlt, UilEllipsisH, UilEye } from '@iconscout/react-unicons';
import FormToddler from './FormToddler';
import FormChecker from './FormChecker';
import FormDiarrhea from './FormDiarrhea';
import FormImmunization from './FormImmunization';
import useSWR from 'swr';
import callApi, { swrCallApi } from '@/utils/network';
import { AxiosRequestConfig } from 'axios';
import DetailToddler from './DetailToddler';

interface DataType {
  _id: string
  nik: string
  name: string
  birthDate: string
  motherName: string
  fatherName: string
  weight: number
  height: number
  address: string
  gender: string
}

const ToddlerContainer = () => {
  const { token: { colorTextSecondary } } = theme.useToken();
  const [formKey, setFormKey] = useState<'' | 'profile' | 'checker' | 'diarrhea' | 'immunization'>('');
  const [openDetail, setOpenDetail] = useState(false);
  const [nikFocus, setNikFocus] = useState('');
  const { data = [], mutate, isLoading } = useSWR('/api/toddler/list', swrCallApi);

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
      dataIndex: 'weight-height',
      render: (_, record) => `${record.weight} Kg / ${record.height} cm`
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
                onClick: () => {
                  setOpenDetail(true);
                  setNikFocus(record.nik);
                }
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
      ),
      width: 64
    },
  ];

  const onCloseModal = () => {
    setFormKey('');
    setOpenDetail(false);
    setNikFocus('');
  };

  const onSubmitFormToddler = async (values: any) => {
    try {
      const method = !nikFocus ? 'POST' : 'PUT';
      const url = !nikFocus ? '/api/toddler/add' : `/api/toddler/edit/${nikFocus}`;
      const options: AxiosRequestConfig = {
        method,
        url: url,
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success(!nikFocus ? 'Tambah data balita berhasil!' : 'Ubah data balita berhasil!');
      }
    } catch (error) {
      message.error(!nikFocus ? 'Tambah data balita gagal!' : 'Ubah data balita gagal!');
    }
  };

  const onSubmitFormChecker = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/toddler/add-check',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data pengecekan balita berhasil!');
      }
    } catch (error) {
      message.error('Tambah data pengecekan balita gagal!');
    }
  };

  const onUpdateFormChecker = async (nik: string, values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/toddler/edit-check',
        data: values,
        params: { nik }
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Ubah data pengecekan balita berhasil!');
      }
    } catch (error) {
      message.error('Ubah data pengecekan balita gagal!');
    }
  };

  const onSubmitFormDiarrhea = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/toddler/add-diarrhea',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data balita diare berhasil!');
      }
    } catch (error) {
      message.error('Tambah data balita diare gagal!');
    }
  };


  const onSubmitFormImmunization = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/toddler/add-immunization',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data balita telah imunisasi berhasil!');
      }
    } catch (error) {
      message.error('Tambah data balita telah imunisasi gagal!');
    }
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
          <Typography.Text style={{ color: colorTextSecondary }}>Balita Dalam Pantauan</Typography.Text>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('profile')}>Balita</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('checker')}>Hasil Pengecekan</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('diarrhea')}>Laporan Diare</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('immunization')}>Imunisasi</Button>
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
        title="Tambah Balita"
        open={formKey === 'profile'}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormToddler
          onSubmit={onSubmitFormToddler}
          defaultValues={data?.find((user: any) => user.nik === nikFocus)}
        />
      </Modal>
      <Modal
        title="Hasil Pengecekan"
        open={formKey === 'checker'}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormChecker onSubmit={onSubmitFormChecker} onUpdate={onUpdateFormChecker} />
      </Modal>
      <Modal
        title="Laporan Diare"
        open={formKey === 'diarrhea'}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormDiarrhea onSubmit={onSubmitFormDiarrhea} />
      </Modal>
      <Modal
        title="Imunisasi Balita"
        open={formKey === 'immunization'}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormImmunization onSubmit={onSubmitFormImmunization} />
      </Modal>
      <Modal
        title="Informasi Balita"
        open={openDetail}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
        width="90%"
      >
        <DetailToddler data={data?.find((user: any) => user.nik === nikFocus)} />
      </Modal>
    </div>
  );
};

export default ToddlerContainer;