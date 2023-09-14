import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import {Button, Checkbox, Input} from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IValues {
    nik: string
    name: string
    birthDate: string
    address: string
    phone: string
    status: string
    pregnantCount: number
    childBirhDate: string
    hpht: string
    phl: string
    birthWeight: number
    birthHeight: number
    tension: string
    lila: number
    bloodType: string
    pudjiRochyatiScore: string
    tetanusVaccine: boolean
}

const schemaValidation = yup.object({
    name: yup.string().required('Nama harus diisi!'),
}).required();

interface FormPregnantProps {
    onSubmit: (value: IValues) => void;
}

const FormPregnant: React.FC<FormPregnantProps> = ({ onSubmit }) => {
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
                    name="nik"
                    render={({ field, fieldState }) => (
                        <Field label="NIK" error={fieldState.error?.message}>
                            <Input {...field} placeholder="357XXXXXXXXXXXXX" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field label="Nama" error={fieldState.error?.message}>
                            <Input {...field} placeholder="Kevin Mourel" />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field, fieldState }) => (
                        <Field label="Tanggal Lahir" error={fieldState.error?.message}>
                            <DatePickerBase {...field} />
                        </Field>
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <Field label="Alamat" error={fieldState.error?.message}>
                            <Input.TextArea {...field} rows={4} placeholder="Jl. Araya Mansion No.8 - 22, Genitri, Tirtomoyo, Kec. Pakis, Kabupaten Malang, Jawa Timur 65154" />
                        </Field>
                    )}
                />
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <Field label="No HP / WA" error={fieldState.error?.message}>
                                <Input {...field} placeholder="+62XXXXXXXX" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="status"
                        render={({ field, fieldState }) => (
                            <Field label="Status Ekonomi" error={fieldState.error?.message}>
                                <Input {...field} placeholder="Gakin" />
                            </Field>
                        )}
                    />
                </div>
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="pregnantCount"
                        render={({ field, fieldState }) => (
                            <Field label="Hamil Ke" error={fieldState.error?.message}>
                                <Input {...field} placeholder="2" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="childBirhDate"
                        render={({ field, fieldState }) => (
                            <Field label="Usia Anak Terkecil" error={fieldState.error?.message}>
                                <Input {...field} placeholder="12" />
                            </Field>
                        )}
                    />
                </div>
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="hpht"
                        render={({ field, fieldState }) => (
                            <Field label="Haid Terakhir (HPHT)" error={fieldState.error?.message}>
                                <DatePickerBase {...field} />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="phl"
                        render={({ field, fieldState }) => (
                            <Field label="Perkiraan Persalinan (PHL)" error={fieldState.error?.message}>
                                <DatePickerBase {...field} />
                            </Field>
                        )}
                    />
                </div>
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="birthWeight"
                        render={({ field, fieldState }) => (
                            <Field label="Berat Badan" error={fieldState.error?.message}>
                                <Input {...field} suffix="Kg" placeholder="5" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="birthHeight"
                        render={({ field, fieldState }) => (
                            <Field label="Tinggi Badan" error={fieldState.error?.message}>
                                <Input {...field} suffix="cm" placeholder="45" />
                            </Field>
                        )}
                    />
                </div>
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="tension"
                        render={({ field, fieldState }) => (
                            <Field label="Tensi" error={fieldState.error?.message}>
                                <Input {...field} placeholder="90/60" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="lila"
                        render={({ field, fieldState }) => (
                            <Field label="Lingkat Lengan Atas (LILA)" error={fieldState.error?.message}>
                                <Input {...field} suffix="cm" placeholder="50" />
                            </Field>
                        )}
                    />
                </div>
                <div style={{ display: 'flex', gap: 16, flexGrow: 1 }}>
                    <Controller
                        control={control}
                        name="bloodType"
                        render={({ field, fieldState }) => (
                            <Field label="Golongan Darah" error={fieldState.error?.message}>
                                <Input {...field} placeholder="AB" />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="pudjiRochyatiScore"
                        render={({ field, fieldState }) => (
                            <Field label="Skor Pudji Rochyati" error={fieldState.error?.message}>
                                <Input {...field} placeholder="90" />
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name="tetanusVaccine"
                    render={({ field, fieldState }) => (
                        <Field label="Status Imunisasi Tetanus" error={fieldState.error?.message}>
                            <Checkbox {...field} >
                                Sudah Imunisasi
                            </Checkbox>
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

export default FormPregnant;
