import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';
import { IData } from '../Dashboard';

const PregnantStatusContent: React.FC<{ data: IData; loading: boolean }> = ({ data, loading = false }) => {
  return (
    <Card title="Ibu Hamil">
      <div style={{ display: 'flex', gap: 16 }}>
        <CardInformation
          loading={loading}
          variant="pregnant"
          title="Ibu Hamil Belum Melahirkan"
          code="#"
          total={data.totalBirthYet?.total}
          newPregnant={data.totalBirthYet?.new}
          oldPregant={data.totalBirthYet?.old}
        />
        <CardInformation
          loading={loading}
          variant="pregnant"
          title="Ibu Hamil KEK"
          code="#"
          total={data.totalPregnantKEK?.total}
          newPregnant={data.totalPregnantKEK?.new}
          oldPregant={data.totalPregnantKEK?.old}
        />
      </div>
    </Card>
  );
};

export default PregnantStatusContent;