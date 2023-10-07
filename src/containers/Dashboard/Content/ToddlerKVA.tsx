import { Card, Col, Row } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';

const ToddlerKVAContent = () => {
  return (
    <Card title="Penanggulangan KVA">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CardInformation 
            variant="toddler" 
            title="Bayi dpt Vit. A Biru"
            code="#"
            total={30}
            male={15}
            female={15}
            infant={20} 
            toddler={10}
          />
        </Col>
        <Col span={6}>
          <CardInformation 
            variant="toddler" 
            title="Bayi dpt Vit. A Merah"
            code="#"
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
                type="compact" 
                title="Bayi usia 6 Bulan"
                code="#"
                total={30}
                male={15}
                female={15}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                type="compact" 
                title="Bayi Usia 0 - 6 Bulan"
                code="#"
                total={30}
                male={15}
                female={15}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                type="compact" 
                title="Bayi Ditimbang Usia 6 Bulan"
                code="#"
                total={30}
                male={15}
                female={15}
              />
            </Col>
            <Col span={12}>
              <CardInformation
                type="compact" 
                title="Bayi Ditimbang Usia 0 - 6 Bulan"
                code="#"
                total={30}
                male={15}
                female={15}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card title="Balita yang diberi ASI saja (ASI Eksklusif)">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <CardInformation
                  type="highlight" 
                  title="Umur 0"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  type="highlight" 
                  title="Umur 1"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  type="highlight" 
                  title="Umur 2"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 3"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 4"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 5"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 6"
                  total={30}
                  male={15}
                  female={15}
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
                  type="highlight" 
                  title="Umur 0"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  type="highlight" 
                  title="Umur 1"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={8}>
                <CardInformation
                  type="highlight" 
                  title="Umur 2"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 3"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 4"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 5"
                  total={30}
                  male={15}
                  female={15}
                />
              </Col>
              <Col span={6}>
                <CardInformation
                  type="highlight" 
                  title="Umur 6"
                  total={30}
                  male={15}
                  female={15}
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