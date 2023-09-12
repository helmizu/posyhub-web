import React, { useEffect } from 'react';
import Layout from '@/components/templates/Layout';
import HomeContainer from '@/containers/Home';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard');
  }, []);

  return (
    <Layout title="Home">
      <HomeContainer />
    </Layout>
  );
};

export default Home;