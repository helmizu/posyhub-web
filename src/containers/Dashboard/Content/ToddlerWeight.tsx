import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const ToddlerWeightContent: React.FC<{ data: IData; loading?: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Status Berat Badan Balita">
      <div style={{ display: 'flex', gap: 16 }}>
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
      </div>
    </Card>
  );
};

export default ToddlerWeightContent;