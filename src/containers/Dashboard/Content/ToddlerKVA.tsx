import { Card, Col, Row } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const ToddlerKVAContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Penanggulangan KVA">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Bayi dpt Vit. A Biru"
            code="A0"
            total={30}
            male={15}
            female={15}
            infant={20}
            toddler={10}
          />
        </Col>
        <Col span={6}>
          <CardInformation
            loading={loading}
            variant="toddler"
            title="Bayi dpt Vit. A Merah"
            code="A1/A2"
            total={30}
            male={15}
            female={15}
            infant={20}
            toddler={10}
          />
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CardInformation
                loading={loading}
                type="compact"
                title="Bayi usia 6 Bulan"
                code="S(6bl)"
                total={data.totalBalita6MonthAge?.total}
                male={data.totalBalita6MonthAge?.male}
                female={data.totalBalita6MonthAge?.female}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                loading={loading}
                type="compact"
                title="Bayi Usia 0 - 6 Bulan"
                code="S(0-6bl)"
                total={data.totalBalitaUntil6MonthAge?.total}
                male={data.totalBalitaUntil6MonthAge?.male}
                female={data.totalBalitaUntil6MonthAge?.female}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                loading={loading}
                type="compact"
                title="Bayi Ditimbang Usia 6 Bulan"
                code="D(6bl)"
                total={data?.totalBalitaAttend6MonthAge?.total}
                male={data?.totalBalitaAttend6MonthAge?.male}
                female={data?.totalBalitaAttend6MonthAge?.female}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                loading={loading}
                type="compact"
                title="Bayi Ditimbang Usia 0 - 6 Bulan"
                code="D(0-6bl)"
                total={data?.totalBalitaAttendUntil6MonthAge?.total}
                male={data?.totalBalitaAttendUntil6MonthAge?.male}
                female={data?.totalBalitaAttendUntil6MonthAge?.female}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card title="Balita yang diberi ASI saja (ASI Eksklusif)">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 0"
                  total={data?.totalBalita0MonthASI?.total}
                  male={data?.totalBalita0MonthASI?.male}
                  female={data?.totalBalita0MonthASI?.female}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 1"
                  total={data?.totalBalita1MonthASI?.total}
                  male={data?.totalBalita1MonthASI?.male}
                  female={data?.totalBalita1MonthASI?.female}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 2"
                  total={data?.totalBalita2MonthASI?.total}
                  male={data?.totalBalita2MonthASI?.male}
                  female={data?.totalBalita2MonthASI?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 3"
                  total={data?.totalBalita3MonthASI?.total}
                  male={data?.totalBalita3MonthASI?.male}
                  female={data?.totalBalita3MonthASI?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 4"
                  total={data?.totalBalita4MonthASI?.total}
                  male={data?.totalBalita4MonthASI?.male}
                  female={data?.totalBalita4MonthASI?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 5" 
                  total={data?.totalBalita5MonthASI?.total}
                  male={data?.totalBalita5MonthASI?.male}
                  female={data?.totalBalita5MonthASI?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 6"
                  total={data?.totalBalita6MonthASI?.total}
                  male={data?.totalBalita6MonthASI?.male}
                  female={data?.totalBalita6MonthASI?.female}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Balita yang diberi makanan selain ASI">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 0"
                  total={data?.totalBalita0MonthASINotEx?.total}
                  male={data?.totalBalita0MonthASINotEx?.male}
                  female={data?.totalBalita0MonthASINotEx?.female}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 1"
                  total={data?.totalBalita1MonthASINotEx?.total}
                  male={data?.totalBalita1MonthASINotEx?.male}
                  female={data?.totalBalita1MonthASINotEx?.female}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 2"
                  total={data?.totalBalita2MonthASINotEx?.total}
                  male={data?.totalBalita2MonthASINotEx?.male}
                  female={data?.totalBalita2MonthASINotEx?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 3"
                  total={data?.totalBalita3MonthASINotEx?.total}
                  male={data?.totalBalita3MonthASINotEx?.male}
                  female={data?.totalBalita3MonthASINotEx?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 4"
                  total={data?.totalBalita4MonthASINotEx?.total}
                  male={data?.totalBalita4MonthASINotEx?.male}
                  female={data?.totalBalita4MonthASINotEx?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 5" 
                  total={data?.totalBalita5MonthASINotEx?.total}
                  male={data?.totalBalita5MonthASINotEx?.male}
                  female={data?.totalBalita5MonthASINotEx?.female}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  loading={loading}
                  type="highlight"
                  title="Umur 6"
                  total={data?.totalBalita6MonthASINotEx?.total}
                  male={data?.totalBalita6MonthASINotEx?.male}
                  female={data?.totalBalita6MonthASINotEx?.female}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ToddlerKVAContent;