import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import {Button, Input, Radio} from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
    name: string
    tanggalPersalinan: string
    gender: string
    birthWeight: number
    birthHeight: number
    tempatPersalinan: string
    KBPaskaSalin: string
    note: string
}

const schemaValidation = yup.object({
    name: yup.string().required('Nama harus diisi!'),
}).required();

interface FormPersalinanProps {
    onSubmit: (value: IValues) => void;
}


const FormPersalinan: React.FC<FormPersalinanProps> = ({ onSubmit }) => {
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
                    name="tanggalPersalinan"
                    render={({ field, fieldState }) => (
                        <Field label="Tanggal Persalinan" error={fieldState.error?.message}>
                            <DatePickerBase {...field} />
                        </Field>
                    )}
                />
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field, fieldState }) => (
                            <Field label="Jenis Kelamin" error={fieldState.error?.message}>
                                <Radio.Group {...field}>
                                    <Radio value="female">Perempuan</Radio>
                                    <Radio value="male">Laki - laki</Radio>
                                </Radio.Group>
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="birthWeight"
                        render={({ field, fieldState }) => (
                            <Field label="Berat Badan Lahir" error={fieldState.error?.message}>
                                <Input {...field} suffix="Kg" placeholder="5" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="birthHeight"
                        render={({ field, fieldState }) => (
                            <Field label="Tinggi Badan Lahir" error={fieldState.error?.message}>
                                <Input {...field} suffix="cm" placeholder="45" />
                            </Field>
                        )}
                    />
                </div>
                <Controller
                    control={control}
                    name="tempatPersalinan"
                    render={({ field, fieldState }) => (
                        <Field label="Tempat Persalinan" error={fieldState.error?.message}>
                            <Input {...field} placeholder="Rumah Sakit Ibu dan Anak" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="KBPaskaSalin"
                    render={({ field, fieldState }) => (
                        <Field label="KB Paska Salin" error={fieldState.error?.message}>
                            <Input {...field} placeholder="" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="note"
                    render={({ field, fieldState }) => (
                        <Field label="Keterangan (Masalah / Komplikasi)" error={fieldState.error?.message}>
                            <Input {...field} placeholder=" " />
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

export default FormPersalinan;
