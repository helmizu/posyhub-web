import { Avatar, Card, Divider, Layout, Row, Space, Typography, } from 'antd';
import React from 'react';
import SummaryContent from './Content/Summary';
import ToddlerCheckContent from './Content/ToddlerCheck';
import ToddlerWeightContent from './Content/ToddlerWeight';
import PregnantStatusContent from './Content/PregnantStatus';
import ToddlerKVAContent from './Content/ToddlerKVA';

const DashboardContainer = () => {
  return (
    <Layout.Content>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <SummaryContent />
        <ToddlerCheckContent />
        <ToddlerWeightContent />
        <ToddlerKVAContent />
        <PregnantStatusContent />
      </Space>
    </Layout.Content>
  );
};

export default DashboardContainer;