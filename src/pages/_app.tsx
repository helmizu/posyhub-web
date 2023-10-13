import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { SWRConfig } from 'swr';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title>Posyhub</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session} refetchInterval={0}>
        <ConfigProvider theme={theme}>
          <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
            <Component {...pageProps} />
          </SWRConfig>
        </ConfigProvider>
      </SessionProvider>
    </>
  );
};

export default App;