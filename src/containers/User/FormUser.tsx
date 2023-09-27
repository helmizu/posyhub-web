import DatePickerBase from '@/components/DatePickerBase';
import Field from '@/components/Field';
import { ROLE } from '@/constants/data';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Input, Select } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  username: string
  password: string
  name: string
  email: string
  role: 'Admin' | 'Kader'
}

const schemaValidation = yup.object({
  name: yup.string().required('Nama imunisasi harus diisi!'),
  username: yup.string().required('Username harus diisi!'),
  email: yup.string().email().required('Email harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
  role: yup.string().required('Role harus diisi!'),
}).required();

interface FormUserProps {
  onSubmit: (value: IValues) => void;
}

const FormUser: React.FC<FormUserProps> = ({ onSubmit }) => {
  const { data = [] } = useSWR('/api/user/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch, formState } = useForm<IValues>({
    defaultValues: {
      name: undefined,
      username: undefined,
      email: undefined,
      role: undefined,
      password: undefined,
    },
    resolver
  });

  const $username = watch('username');
  const $email = watch('email');

  const isDuplicatedUsername = !!$username && !!data?.find((item: IValues) => item.username === $username);
  const isDuplicatedEmail = !!$email && !!data?.find((item: IValues) => item.email === $email);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          name="email"
          render={({ field, fieldState }) => (
            <Field label="Email" error={isDuplicatedEmail ? 'Email telah terdaftar!' : fieldState.error?.message}>
              <Input {...field} placeholder="user.admin@mail.com" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <Field label="Username" error={isDuplicatedUsername ? 'Username telah terdaftar!' : fieldState.error?.message}>
              <Input {...field} placeholder="admin001" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field label="Password" error={fieldState.error?.message}>
              <Input.Password {...field} placeholder="********" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="role"
          render={({ field, fieldState }) => (
            <Field label="Role" error={fieldState.error?.message}>
              <Select options={ROLE.map(item => ({ label: item, value: item }))} {...field} placeholder="Pilih jenis imunisasi" />
            </Field>
          )}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={(!isDuplicatedEmail || !isDuplicatedUsername) && formState.isValid}
            loading={formState.isLoading}
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormUser;