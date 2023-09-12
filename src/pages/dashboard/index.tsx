import React from 'react';
import Layout from '@/components/templates/Layout';
import DashboardContainer from '@/containers/Dashboard';

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <DashboardContainer />
    </Layout>
  );
};

export default Dashboard;
