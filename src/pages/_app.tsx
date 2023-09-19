import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ConfigProvider theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </SessionProvider>
  );
};

export default App;