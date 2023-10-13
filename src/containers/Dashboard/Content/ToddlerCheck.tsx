import { Card, Col, Row } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const ToddlerCheckContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Hasil Penimbangan">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Balita Naik Berat Badan"
            code="N"
            total={data.totalBalitaGainWeight?.total}
            male={data.totalBalitaGainWeight?.male}
            female={data.totalBalitaGainWeight?.female}
            infant={data.totalBalitaGainWeight?.infant}
            toddler={data.totalBalitaGainWeight?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Balita Tidak Naik Berat Badan"
            code="T"
            total={data.totalBalitaLossWeigth?.total}
            male={data.totalBalitaLossWeigth?.male}
            female={data.totalBalitaLossWeigth?.female}
            infant={data.totalBalitaLossWeigth?.infant}
            toddler={data.totalBalitaLossWeigth?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Balita Tidak Hadir"
            code=".-"
            total={data.totalBalitaNotAttend?.total}
            male={data.totalBalitaNotAttend?.male}
            female={data.totalBalitaNotAttend?.female}
            infant={data.totalBalitaNotAttend?.infant}
            toddler={data.totalBalitaNotAttend?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Balita Terdaftar KMS"
            code="K"
            total={data?.totalBalitaHaveKMS?.total ?? 0}
            male={data?.totalBalitaHaveKMS?.male ?? 0}
            female={data?.totalBalitaHaveKMS?.female ?? 0}
            infant={data?.totalBalitaHaveKMS?.infant ?? 0}
            toddler={data?.totalBalitaHaveKMS?.toddler ?? 0}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ToddlerCheckContent;