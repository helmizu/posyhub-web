import React, { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Input, Modal, Table, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import FormUser from './FormUser';
import useSWR from 'swr';
import callApi, { swrCallApi } from '@/utils/network';
import { AxiosRequestConfig } from 'axios';
import FormResetPassword from './FormResetPassword';
import { UilEditAlt, UilEllipsisH, UilKeySkeletonAlt } from '@iconscout/react-unicons';
import { useRouter } from 'next/router';

interface DataType {
  _id: string
  username: string
  password: string
  name: string
  email: string
  phone: string
  role: 'Admin' | 'Kader'
}

const UserContainer = () => {
  const [addForm, setAddForm] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [editForm, setEditForm] = useState('');
  const [search, setSearch] = useState('');
  const { data = [], mutate, isLoading } = useSWR(['/api/user/list', { search }], ([url, params]) => swrCallApi(url, { params }));
  const { data: profile = {} } = useSWR('/api/user/profile', swrCallApi);
  const isKader = profile?.role?.toLowerCase() === 'kader';
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Nomor Hp',
      dataIndex: 'phone',
      render: (value) => value || '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value) => value || '-',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Ubah',
                icon: <UilEditAlt size={16} />,
                onClick: () => {
                  setEditForm(record.username);
                }
              },
              {
                key: 'reset-password',
                label: 'Reset Password',
                icon: <UilKeySkeletonAlt size={16} />,
                onClick: () => {
                  setResetPassword(record.username);
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
    setAddForm(false);
    setEditForm('');
  };

  const onSubmitFormUser = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/user/add',
        data: values,
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        onCloseModal();
        message.success('Tambah data pengguna berhasil!');
      }
    } catch (error) {
      message.error('Tambah data pengguna gagal!');
    }
  };

  const onSubmitFormEditUser = async (values: any) => {
    try {
      if (values.password) delete values.password;
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/user/edit',
        data: values,
      };
      const editToddler = await callApi(options);
      if (editToddler) {
        mutate();
        onCloseModal();
        message.success('Ubah data pengguna berhasil!');
      }
    } catch (error) {
      message.error('Ubah data pengguna gagal!');
    }
  };

  const onSubmitFormResetPassword = async (values: any) => {
    try {
      const options: AxiosRequestConfig = {
        method: 'PUT',
        url: '/api/user/reset-password',
        data: { username: resetPassword, ...values },
      };
      const addToddler = await callApi(options);
      if (addToddler) {
        mutate();
        setResetPassword('');
        message.success('Atur ulang password berhasil!');
      }
    } catch (error) {
      message.error('Atur ulang password gagal!');
    }
  };

  useEffect(() => {
    if (isKader) {
      router.replace('/');
    }
  }, [isKader]);


  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <Typography.Title level={4}>Data Pengguna</Typography.Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddForm(true)}>Pengguna</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Input.Search placeholder="Cari di sini..." onChange={(e) => setSearch(e.target.value)} value={search} />
        </div>
      </div>
      <Card bordered bodyStyle={{ padding: 0 }}>
        <Table
          rowKey={(record) => record.username}
          columns={columns}
          dataSource={data}
          loading={isLoading}
        />
      </Card>
      <Modal
        title="Tambah Pengguna"
        open={addForm}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormUser
          onSubmit={onSubmitFormUser}
        />
      </Modal>
      <Modal
        title="Ubah Pengguna"
        open={!!editForm}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
      >
        <FormUser
          edit
          onSubmit={onSubmitFormEditUser}
          defaultValues={data?.find((item: DataType) => item.username === editForm)}
        />
      </Modal>
      <Modal
        title="Reset Password"
        open={!!resetPassword}
        footer={null}
        onCancel={() => setResetPassword('')}
        destroyOnClose
      >
        <FormResetPassword
          onSubmit={onSubmitFormResetPassword}
        />
      </Modal>
    </div>
  );
};

export default UserContainer;