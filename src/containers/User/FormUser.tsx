import Field from '@/components/Field';
import { ROLE } from '@/constants/data';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Input, Select } from 'antd';
import React from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  username: string
  password: string
  name: string
  email: string
  phone: string
  role: 'Admin' | 'Kader'
}

interface FormUserProps {
  onSubmit: (value: IValues) => void;
  edit?: boolean;
  defaultValues?: IValues;
}

const FormUser: React.FC<FormUserProps> = ({ onSubmit, edit = false, defaultValues }) => {
  const { data = [] } = useSWR('/api/user/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));

  const schemaValidation = yup.object({
    name: yup.string().required('Nama imunisasi harus diisi!'),
    username: yup.string().required('Username harus diisi!'),
    email: yup.string().email().optional(),
    phone: yup.string().required('Nomor HP harus diisi!'),
    password: edit ? yup.string().optional() : yup.string().required('Password harus diisi!'),
    role: yup.string().required('Role harus diisi!'),
  }).required();
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch } = useForm<IValues>({
    defaultValues: {
      name: defaultValues?.name ?? undefined,
      username: defaultValues?.username ?? undefined,
      email: defaultValues?.email ?? undefined,
      phone: defaultValues?.phone ?? undefined,
      role: defaultValues?.role ?? undefined,
      password: defaultValues?.password ?? undefined,
    },
    resolver
  });
  const formState = useFormState({ control });

  const $username = watch('username');
  const $email = watch('email');
  const $phone = watch('phone');

  const dataToCheck = !edit ? data : data?.filter((item: IValues) => item.username !== defaultValues?.username);

  const isDuplicatedUsername = !!$username && !!dataToCheck?.find((item: IValues) => item.username?.toLowerCase() === $username?.toLowerCase());
  const isDuplicatedEmail = !!$email && !!dataToCheck?.find((item: IValues) => item.email?.toLowerCase() === $email?.toLowerCase());
  const isDuplicatedPhone = !!$phone && !!dataToCheck?.find((item: IValues) => item.phone === $phone);

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
              <Input {...field} placeholder="user.admin@mail.com" type="email" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <Field label="Nomor HP" error={isDuplicatedPhone ? 'Nomor HP telah terdaftar!' : fieldState.error?.message}>
              <Input {...field} placeholder="0821XXXXXXXX" />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <Field label="Username" error={isDuplicatedUsername ? 'Username telah terdaftar!' : fieldState.error?.message}>
              <Input {...field} placeholder="admin001" disabled={edit} />
            </Field>
          )}
        />
        {!edit && (
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field label="Password" error={fieldState.error?.message}>
                <Input.Password {...field} placeholder="********" />
              </Field>
            )}
          />
        )}
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
            disabled={(isDuplicatedEmail || isDuplicatedUsername || isDuplicatedPhone)}
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