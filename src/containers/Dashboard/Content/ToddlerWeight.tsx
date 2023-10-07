import { Card } from 'antd';
import React from 'react';
import CardInformation from './CardInformation';

const ToddlerWeightContent = () => {
  return (
    <Card title="Status Berat Badan Balita">
      <div style={{ display: 'flex', gap: 16 }}>
        <CardInformation 
          variant="toddler" 
          title="Berat Badan Sangat Kurang"
          code="BBSK"
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Berat Badan Kurang"
          code="BBK"
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Berat Badan Normal"
          code="BBN"
          total={30}
          male={15}
          female={15}
          infant={20} 
          toddler={10}
        />
        <CardInformation 
          variant="toddler" 
          title="Berat Badan Lebih"
          code="BBL"
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

export default ToddlerWeightContent;