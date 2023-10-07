import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';

const PregnantStatusContent = () => {
  return (
    <Card title="Ibu Hamil">
      <div style={{ display: 'flex', gap: 16 }}>
        <CardInformation 
          variant="pregnant" 
          title="Ibu Hamil Belum Melahirkan"
          code="#" 
          total={50}
          newPregnant={20} 
          oldPregant={30}
        />
        <CardInformation 
          variant="pregnant" 
          title="Ibu Hamil KEK"
          code="#" 
          total={30}
          newPregnant={20} 
          oldPregant={10}
        />
        <CardInformation 
          variant="pregnant" 
          title="Ibu Hamil Sudah Diperiksa"
          code="#" 
          total={30}
          newPregnant={20} 
          oldPregant={10}
        />
      </div>
    </Card>
  );
};

export default PregnantStatusContent;