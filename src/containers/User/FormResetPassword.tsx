import Field from '@/components/Field';
import { swrCallApi } from '@/utils/network';
import { useYupValidationResolver } from '@/utils/yupResolver';
import { Button, Input } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface IValues {
  password: string
}

const schemaValidation = yup.object({
  password: yup.string().required('Password harus diisi!'),
}).required();

interface FormResetPasswordProps {
  onSubmit: (value: IValues) => void;
}

const FormResetPassword: React.FC<FormResetPasswordProps> = ({ onSubmit }) => {
  const { data = [] } = useSWR('/api/user/list', (url) => swrCallApi(url, { params: { page: 1, size: 99999 } }));
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, watch, formState } = useForm<IValues>({
    defaultValues: {
      password: undefined,
    },
    resolver
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field label="Password Baru" error={fieldState.error?.message}>
              <Input.Password {...field} placeholder="********" />
            </Field>
          )}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={formState.isValid}
            loading={formState.isLoading}
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormResetPassword;