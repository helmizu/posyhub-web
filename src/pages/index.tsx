import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Spin, Typography, theme } from 'antd';

const Home = () => {
  const { token: { colorPrimary } } = theme.useToken();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status]);

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <Spin size="large" />
      <Typography.Text strong style={{ color: colorPrimary }}>Checking...</Typography.Text>
    </div>
  );
};

export default Home;