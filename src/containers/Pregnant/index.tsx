import React, { useState } from 'react';
import { Badge, Button, Card, Dropdown, Input, Modal, Table, Typography, theme, message } from 'antd';
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
import callApi, { swrCallApi } from '@/utils/network';
import { AxiosRequestConfig } from 'axios';
import DetailChildBirth from '@/containers/Pregnant/DetailChildBirth';
import { DOCUMENT_PREGNANT, TDocumentTemplate } from '@/types/document';

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
  const [openDetail, setOpenDetail] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [nikFocus, setNikFocus] = useState('');
  const { data: profile = {} } = useSWR('/api/user/profile', swrCallApi);
  const { data: { pregnantTotal = 0, pregnantThisMonth = 0, kekTotal = 0, } = {}} = useSWR('/api/pregnant/stats', swrCallApi);
  const isKader = profile?.role?.toLowerCase() === 'kader';
  const [search, setSearch] = useState('');
  const { data = [], mutate, isLoading } = useSWR(['/api/pregnant/list', { search }], ([url, params]) => swrCallApi(url, { params }));


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
      )
    },
  ];

  const onCloseModal = () => {
    setFormKey('');
    setNikFocus('');
    setOpenDetail(false);
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

  const onGenerateDocument = async (type: TDocumentTemplate) => {
    try {
      setGenerating(true);
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: '/api/document/generate',
        params: { type }
      };
      const generated = await callApi(options);
      if (generated) {
        message.success('Dokumen telah berhasil disimpan!');
        let downloadLink = document.createElement('a');
        downloadLink.href = generated?.url;
        downloadLink.download = generated?.name || true;
        downloadLink.target = '_blank';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.log({ error });
      message.error('Dokumen gagal disimpan!');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <Typography.Title level={4}>Data Ibu Hamil</Typography.Title>
      <div style={{ display: 'flex', gap: 16 }}>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Total Ibu Hamil</Typography.Text>
          <Typography.Title level={5}>{pregnantTotal}</Typography.Title>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Ibu Hamil Hadir {formatDate(new Date(), 'MMMM YYYY')}</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>{pregnantThisMonth}</Typography.Title>
            <Badge count={`${toPercentage(pregnantThisMonth * 100 / pregnantThisMonth)}%`} color="#697077" />
          </div>
        </Card>
        <Card bordered style={{ flex: 1 }} bodyStyle={{ padding: 16 }}>
          <Typography.Text style={{ color: colorTextSecondary }}>Ibu Hamil KEK</Typography.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>{kekTotal}</Typography.Title>
            <Badge count={`${toPercentage(kekTotal * 100 / pregnantThisMonth)}%`} color="#697077" />
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isKader && (
            <>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('profile')}>Ibu Hamil</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('child-birth')}>Persalinan</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormKey('kb')}>KB</Button>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Input.Search placeholder="Cari di sini..." onChange={(e) => setSearch(e.target.value)} />
          {isKader && (
            <Dropdown
              trigger={['click']}
              menu={{
                items: DOCUMENT_PREGNANT.map(item => ({
                  onClick: () => onGenerateDocument(item.key),
                  ...item,
                }))
              }}
            >
              <Button icon={<PrinterOutlined />} loading={generating}>Cetak</Button>
            </Dropdown>
          )}
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
      <Modal
        title="Informasi Ibu Hamil"
        open={openDetail}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
        width="90%"
      >
        <DetailChildBirth data={data?.find((user: any) => user.nik === nikFocus)} />
      </Modal>
    </div>
  );
};

export default PregnantContainer;
