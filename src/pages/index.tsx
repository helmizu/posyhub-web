import React, { useEffect } from 'react';
import Layout from '@/components/templates/Layout';
import HomeContainer from '@/containers/Home';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Home = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, []);

  return (
    <Layout title="Home">
      <HomeContainer />
    </Layout>
  );
};

export default Home;