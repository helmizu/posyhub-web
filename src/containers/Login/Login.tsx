import React from 'react';
import { Input, Button, Card, message } from 'antd';
import { Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import Field from '@/components/Field';
import { useYupValidationResolver } from '@/utils/yupResolver';
import * as yup from 'yup';
import { SignInOptions, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

interface IValues {
  username: string;
  password: string;
}

const schemaValidation = yup.object({
  username: yup.string().required('Username harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
}).required();

const LoginContainer = () => {
  const router = useRouter();
  const resolver = useYupValidationResolver(schemaValidation);
  const { control, handleSubmit, formState } = useForm<IValues>({
    defaultValues: {
      username: undefined,
      password: undefined
    },
    resolver
  });

  const onSubmit = async (values: any) => {
    const res: any = await signIn('credentials', {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: `${window.location.origin}/dashboard`,
    });
    if (res?.error) return message.error(res.error);
    if (res?.url) return router.push('/dashboard');
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
          <Title level={3}>Selamat Datang!</Title>
          <Text>Silahkan masukkan username dan password Anda!</Text>
        </div>
        <form style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
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
                  <Input.Password
                    {...field}
                    placeholder="Masukkan password"
                  />
                </Field>
              )}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={formState.isSubmitting}>Masuk</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginContainer;
