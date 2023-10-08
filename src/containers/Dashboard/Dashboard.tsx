import { Avatar, Card, Divider, Layout, Row, Space, Typography, } from 'antd';
import React from 'react';
import SummaryContent from './Content/Summary';
import ToddlerCheckContent from './Content/ToddlerCheck';
import ToddlerWeightContent from './Content/ToddlerWeight';
import PregnantStatusContent from './Content/PregnantStatus';
import ToddlerKVAContent from './Content/ToddlerKVA';
import { swrCallApi } from '@/utils/network';
import useSWR from 'swr';

export interface IData {
  totalBalita: VToddler
  totalBalitaAttend: VToddler
  totalPregnant: VPregnant
  totalAlreadyBirth: VPregnant
  totalBalitaGainWeight: VToddler
  totalBalitaLossWeigth: VToddler
  totalBalitaNotAttend: VToddler
  totalBalitaWeightStatusVeryLess: VToddler
  totalBalitaWeightStatusLess: VToddler
  totalBalitaWeightStatusNormal: VToddler
  totalBalitaWeightStatusOver: VToddler
  totalBalitaHaveKMS: VToddler
  totalBalita6MonthAge: VToddler
  totalBalitaUntil6MonthAge: VToddler
  totalBalitaAttend6MonthAge: VToddler
  totalBalitaAttendUntil6MonthAge: VToddler
  totalBalita0MonthASI: VToddler
  totalBalita1MonthASI: VToddler
  totalBalita2MonthASI: VToddler
  totalBalita3MonthASI: VToddler
  totalBalita4MonthASI: VToddler
  totalBalita5MonthASI: VToddler
  totalBalita6MonthASI: VToddler
  totalBalita0MonthASINotEx: VToddler
  totalBalita1MonthASINotEx: VToddler
  totalBalita2MonthASINotEx: VToddler
  totalBalita3MonthASINotEx: VToddler
  totalBalita4MonthASINotEx: VToddler
  totalBalita5MonthASINotEx: VToddler
  totalBalita6MonthASINotEx: VToddler
  totalBirthYet: VPregnant
  totalPregnantKEK: VPregnant
}

interface VToddler {
  total: number
  infant?: number
  toddler?: number
  male: number
  female: number
}

interface VPregnant {
  total: number
  new: number
  old: number
}

const DashboardContainer = () => {
  const { data = {}, isLoading } = useSWR('/api/dashboard/stats', swrCallApi);
  return (
    <Layout.Content>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <SummaryContent loading={isLoading} data={data} />
        <ToddlerCheckContent loading={isLoading} data={data} />
        <ToddlerWeightContent loading={isLoading} data={data} />
        <ToddlerKVAContent loading={isLoading} data={data} />
        <PregnantStatusContent loading={isLoading} data={data} />
      </Space>
    </Layout.Content>
  );
};

export default DashboardContainer;