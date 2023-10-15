import { Button, Card, Col, Row, message } from 'antd';
import React, { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import callApi, { swrCallApi } from '@/utils/network';
import { PrinterOutlined } from '@ant-design/icons';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const SummaryContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  const [generating, setGenerating] = useState(false);
  const { data: profile = {} } = useSWR('/api/user/profile', swrCallApi);
  const isKader = profile?.role?.toLowerCase() === 'kader';

  const onGenerateDocument = async () => {
    try {
      setGenerating(true);
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: '/api/document/generate',
        params: { type: 'dashboard' }
      };
      const generated = await callApi(options);
      if (generated) {
        message.success('Dokumen telah berhasil disimpan!');
        let downloadLink = document.createElement('a');
        downloadLink.href = generated?.url;
        downloadLink.download = generated?.name || true;
        downloadLink.target = '_blank';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.log({ error });
      message.error('Dokumen gagal disimpan!');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card title={
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span>Ringkasan</span>
        {isKader && (<Button icon={<PrinterOutlined />} loading={generating} onClick={onGenerateDocument}>Cetak</Button>)}
      </div>
    }>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Total Balita"
            code="S"
            total={data.totalBalita?.total}
            male={data.totalBalita?.male}
            female={data.totalBalita?.female}
            infant={data.totalBalita?.infant}
            toddler={data.totalBalita?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Balita Sudah Ditimbang"
            code="D"
            total={data.totalBalitaAttend?.total}
            male={data.totalBalitaAttend?.male}
            female={data.totalBalitaAttend?.female}
            infant={data.totalBalitaAttend?.infant}
            toddler={data.totalBalitaAttend?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="pregnant"
            title="Total Ibu Hamil"
            code="#"
            total={data.totalPregnant?.total}
            newPregnant={data.totalPregnant?.new}
            oldPregant={data.totalPregnant?.old}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="pregnant"
            title="Ibu Hamil Sudah Melahirkan"
            code="#"
            total={data.totalAlreadyBirth?.total}
            newPregnant={data.totalAlreadyBirth?.new}
            oldPregant={data.totalAlreadyBirth?.old}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryContent;