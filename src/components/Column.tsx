import { Typography, theme } from 'antd';
import React from 'react';

interface ColumnProps {
  text?: string;
  subtext?: string;
}

const Column: React.FC<ColumnProps> = ({ text, subtext }) => {
  const { token: { colorTextSecondary } } = theme.useToken();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!!text && (<Typography.Text style={{ fontWeight: 500 }}>{text}</Typography.Text>)}
      {!!subtext && (<Typography.Text style={{ color: colorTextSecondary }}>{subtext}</Typography.Text>)}
    </div>
  );
};

export default Column;