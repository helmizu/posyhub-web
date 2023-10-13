import { Card, Col, Row } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const PregnantStatusContent: React.FC<{ data: IData; loading: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Ibu Hamil">
      <Row gutter={[16,16]}>
        <Col xs={24} sm={12}>
          <CardInformation
            loading={loading}
            variant="pregnant"
            title="Ibu Hamil Belum Melahirkan"
            code="#"
            total={data.totalBirthYet?.total}
            newPregnant={data.totalBirthYet?.new}
            oldPregant={data.totalBirthYet?.old}
          />
        </Col>
        <Col xs={24} sm={12}>
          <CardInformation
            loading={loading}
            variant="pregnant"
            title="Ibu Hamil KEK"
            code="#"
            total={data.totalPregnantKEK?.total}
            newPregnant={data.totalPregnantKEK?.new}
            oldPregant={data.totalPregnantKEK?.old}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PregnantStatusContent;