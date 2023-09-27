import React, { useState } from 'react';
import { Button, Card, Input, Modal, Table, Typography, message } from 'antd';
import { PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import FormUser from './FormUser';
import useSWR from 'swr';
import callApi, { swrCallApi } from '@/utils/network';
import { AxiosRequestConfig } from 'axios';

interface DataType {
  _id: string
  username: string
  password: string
  name: string
  email: string
  role: 'Admin' | 'Kader'
}

const UserContainer = () => {
  const [addForm, setAddForm] = useState(false);
  const { data = [], mutate, isLoading } = useSWR('/api/user/list', swrCallApi);

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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
  ];

  const onCloseModal = () => {
    setAddForm(false);
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

  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <Typography.Title level={4}>Data Pengguna</Typography.Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddForm(true)}>Pengguna</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Input.Search placeholder="Cari di sini..." />
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
    </div>
  );
};

export default UserContainer;