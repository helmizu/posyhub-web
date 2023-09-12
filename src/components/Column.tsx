import { Typography, theme } from 'antd';
import React from 'react';

const Column = () => {
  const { token: { colorTextSecondary } } = theme.useToken();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography.Text style={{ fontWeight: 500 }}>text</Typography.Text>
      <Typography.Text style={{ color: colorTextSecondary }}>text</Typography.Text>
    </div>
  );
};

export default Column;