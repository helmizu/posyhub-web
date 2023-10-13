import { Card, Col, Row } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const ToddlerWeightContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Status Berat Badan Balita">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Berat Badan Sangat Kurang"
            code="BBSK"
            total={data.totalBalitaWeightStatusVeryLess?.total}
            male={data.totalBalitaWeightStatusVeryLess?.male}
            female={data.totalBalitaWeightStatusVeryLess?.female}
            infant={data.totalBalitaWeightStatusVeryLess?.infant}
            toddler={data.totalBalitaWeightStatusVeryLess?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Berat Badan Kurang"
            code="BBK"
            total={data.totalBalitaWeightStatusLess?.total}
            male={data.totalBalitaWeightStatusLess?.male}
            female={data.totalBalitaWeightStatusLess?.female}
            infant={data.totalBalitaWeightStatusLess?.infant}
            toddler={data.totalBalitaWeightStatusLess?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Berat Badan Normal"
            code="BBN"
            total={data.totalBalitaWeightStatusNormal?.total}
            male={data.totalBalitaWeightStatusNormal?.male}
            female={data.totalBalitaWeightStatusNormal?.female}
            infant={data.totalBalitaWeightStatusNormal?.infant}
            toddler={data.totalBalitaWeightStatusNormal?.toddler}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Berat Badan Lebih"
            code="BBL"
            total={data.totalBalitaWeightStatusOver?.total}
            male={data.totalBalitaWeightStatusOver?.male}
            female={data.totalBalitaWeightStatusOver?.female}
            infant={data.totalBalitaWeightStatusOver?.infant}
            toddler={data.totalBalitaWeightStatusOver?.toddler}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ToddlerWeightContent;