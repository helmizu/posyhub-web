import React from 'react';
import { Input, Button, Card } from 'antd';
import { Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import * as yup from 'yup';

const { Title } = Typography;

interface IValues {
  username: string;
  password: string;
}

const schemaValidation = yup.object({
  username: yup.string().required('Username harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
}).required();

const LoginContainer = () => {
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit } = useForm<IValues>({
    defaultValues: {
      username: undefined,
      password: undefined
    },
    resolver
  });

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Title level={2}>Selamat Datang! </Title>
          <span>Silahkan masukkan username dan password anda!</span>
        </div>
        <form style={{ marginTop: '20px' }} onSubmit={handleSubmit(onFinish)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: '12px' }}>
            <Controller
              control={control}
              name="username"
              render={({ field, fieldState }) => (
                <Field label="Username" error={fieldState.error?.message}>
                  <Input
                    {...field}
                    placeholder="Masukkan username"
                  />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field label="Password" error={fieldState.error?.message}>
                  <Input
                    {...field}
                    placeholder="Masukkan password"
                  />
                </Field>
              )}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">Masuk</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginContainer;
