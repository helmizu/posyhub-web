import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';

const SummaryContent = () => {
  return (
    <Card title="Ringkasan">
      <div style={{ display: 'flex', gap: 16 }}>
        <CardInformation 
          variant="toddler" 
          title="Total Balita"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Balita Sudah Timbang"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="pregnant" 
          title="Total Ibu Hamil"
          code="S" 
          total={50}
          newPregnant={20} 
          oldPregant={30}
        />
        <CardInformation 
          variant="pregnant" 
          title="Ibu Hamil Sudah Melahirkan"
          code="S" 
          total={30}
          newPregnant={20} 
          oldPregant={10}
        />
      </div>
    </Card>
  );
};

export default SummaryContent;