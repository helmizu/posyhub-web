import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const ToddlerCheckContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Hasil Penimbangan">
      <div style={{ display: 'flex', gap: 16 }}>
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
      </div>
    </Card>
  );
};

export default ToddlerCheckContent;