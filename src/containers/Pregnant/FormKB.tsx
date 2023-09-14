import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import {Button, Checkbox, Input, Radio} from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
    name: string
    reportDate: string
    status: string
    type: string
    reason: string
    alokon: string
    case: string
    dropout: string
}

const schemaValidation = yup.object({
    name: yup.string().required('Nama harus diisi!'),
}).required();

interface FormKBProps {
    onSubmit: (value: IValues) => void;
}


const FormKB: React.FC<FormKBProps> = ({ onSubmit }) => {
    const resolver = useYupValidationResolver(schemaValidation);
    const { control, handleSubmit } = useForm<IValues>({
        defaultValues: {},
        resolver
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field label="Nama" error={fieldState.error?.message}>
                            <Input {...field} placeholder="Pilih nama ibu hamil" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="reportDate"
                    render={({ field, fieldState }) => (
                        <Field label="Tanggal Lapor" error={fieldState.error?.message}>
                            <DatePickerBase {...field} />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="status"
                    render={({ field, fieldState }) => (
                        <Field label="Status Peserta KB" error={fieldState.error?.message}>
                            <Radio.Group {...field}>
                                <Radio value="new">Baru</Radio>
                                <Radio value="old">Lama</Radio>
                            </Radio.Group>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="type"
                    render={({ field, fieldState }) => (
                        <Field label="Tipe" error={fieldState.error?.message}>
                            <Radio.Group {...field}>
                                <Radio value="pascaSalin">KB Pasca Salin</Radio>
                                <Radio value="pascaKeguguran">Pasca Keguguran</Radio>
                            </Radio.Group>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="reason"
                    render={({ field, fieldState }) => (
                        <Field label="Alasan BerKB" error={fieldState.error?.message}>
                            <Checkbox {...field} >
                                PUS 4T
                            </Checkbox>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="alokon"
                    render={({ field, fieldState }) => (
                        <Field label="Jenis Alokon" error={fieldState.error?.message}>
                            <Input {...field} placeholder="UID / Implant / Suntik / PIL / Kondom / Mow/Mop" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="case"
                    render={({ field, fieldState }) => (
                        <Field label="Kasus (Opsional)" error={fieldState.error?.message}>
                            <Radio.Group {...field}>
                                <Radio value="pascaSalin">Kegagalan</Radio>
                                <Radio value="pascaKeguguran">Efek Samping</Radio>
                                <Radio value="pascaKeguguran">Komplikasi</Radio>
                            </Radio.Group>
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="dropout"
                    render={({ field, fieldState }) => (
                        <Field label="Drop Out (Opsional)" error={fieldState.error?.message}>
                            <Radio.Group {...field}>
                                <Radio value="pascaSalin">Hamil</Radio>
                                <Radio value="pascaKeguguran">Menopouse</Radio>
                            </Radio.Group>
                        </Field>
                    )}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit">Simpan</Button>
                </div>
            </div>
        </form>
    );
};

export default FormKB;
