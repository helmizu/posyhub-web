import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const SummaryContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Ringkasan">
      <div style={{ display: 'flex', gap: 16 }}>
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
        <CardInformation
          loading={loading}
          variant="pregnant"
          title="Total Ibu Hamil"
          code="#"
          total={data.totalPregnant?.total}
          newPregnant={data.totalPregnant?.new}
          oldPregant={data.totalPregnant?.old}
        />
        <CardInformation
          loading={loading}
          variant="pregnant"
          title="Ibu Hamil Sudah Melahirkan"
          code="#"
          total={data.totalAlreadyBirth?.total}
          newPregnant={data.totalAlreadyBirth?.new}
          oldPregant={data.totalAlreadyBirth?.old}
        />
      </div>
    </Card>
  );
};

export default SummaryContent;