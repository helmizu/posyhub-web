import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';

const ToddlerCheckContent = () => {
  return (
    <Card title="Hasil Penimbangan">
      <div style={{ display: 'flex', gap: 16 }}>
        <CardInformation 
          variant="toddler" 
          title="Balita Naik Berat Badan"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Balita Tidak Naik Berat Badan"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Balita Ditimbang"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Balita Tidak Posyandu"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Balita Terdaftar KMS"
          code="S" 
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
      </div>
    </Card>
  );
};

export default ToddlerCheckContent;