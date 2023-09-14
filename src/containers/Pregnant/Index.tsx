import React, { useState } from 'react';
import { Badge, Button, Card, Dropdown, Input, Modal, Table, Typography, theme } from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Column from '@/components/Column';
import { formatDate } from '@/utils/date';
import { birthDateToAge, toPercentage } from '@/utils/formatter';
import { UilEditAlt, UilEllipsisH, UilEye } from '@iconscout/react-unicons';
import FormPregnant from './FormPregnant';
import FormKB from "@/containers/Pregnant/FormKB";
import FormPersalinan from "@/containers/Pregnant/FormPersalinan";

interface DataType {
    _id: string
    nik: string
    name: string
    birthDate: string
    address: string
    phone: string
    pregnantCount: number
    estimated: string

}

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
        dataIndex: 'phone',
    },
    {
        title: 'Hamil ke ... ',
        dataIndex: 'pregnantCount',
    },
    {
        title: 'Perkiraan Persalinan',
        dataIndex: 'estimated',
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
        address: 'Jl. Araya Mansion No.8 - 22',
        phone: '+628502384393',
        pregnantCount: 3,
        estimated:'2002-01-01T00:00:00.000Z',
    },
    {
        _id: '64fd642158bb96ffcb03069d',
        nik: '1234567890',
        name: 'John Doe',
        birthDate: '2000-01-01T00:00:00.000Z',
        address: 'Jl. Araya Mansion No.8 - 22',
        phone: '+628502384393',
        pregnantCount: 3,
        estimated:'2002-01-01T00:00:00.000Z',
    },
    {
        _id: '64fd642158bb96ffcb03069d',
        nik: '1234567890',
        name: 'John Doe',
        birthDate: '2000-01-01T00:00:00.000Z',
        address: 'Jl. Araya Mansion No.8 - 22',
        phone: '+628502384393',
        pregnantCount: 3,
        estimated:'2002-01-01T00:00:00.000Z',
    },
];

const PregnantContainer = () => {
    const { token: { colorTextSecondary } } = theme.useToken();
    const [addIbuHamil, setAddIbuHamil] = useState(false);
    const [addKB, setAddKB] = useState(false)
    const [addPersalinan, setAddPersalinan] = useState(false)

    const onSubmitForm = (values: Partial<DataType>) => {
        console.log({ values });
    };

    const onSubmitFormKB = (values: Partial<DataType>) => {
        console.log({ values });
    };

    const onSubmitFormPersalinan = (values: Partial<DataType>) => {
        console.log({ values });
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
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddIbuHamil(true)}>Ibu Hamil</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddPersalinan(true)}>Persalinan</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddKB(true)}>KB</Button>
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
                title="Tambah Ibu Hamil"
                open={addIbuHamil}
                footer={null}
                onCancel={() => setAddIbuHamil(false)}
            >
                <FormPregnant onSubmit={onSubmitForm} />
            </Modal>
            <Modal
                title="Tambah KB"
                open={addKB}
                footer={null}
                onCancel={() => setAddKB(false)}
            >
                <FormKB onSubmit={onSubmitFormKB} />
            </Modal>
            <Modal
                title="Tambah Persalinan"
                open={addPersalinan}
                footer={null}
                onCancel={() => setAddPersalinan(false)}
            >
                <FormPersalinan onSubmit={onSubmitFormPersalinan} />
            </Modal>
        </div>
    );
};

export default PregnantContainer;
