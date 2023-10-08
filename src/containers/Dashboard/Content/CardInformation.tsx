import { Avatar, Card, Divider, Space, Typography } from 'antd';
import React from 'react';

interface IProps {
  title: string;
  total: number;
  code?: string;
  male?: number;
  female?: number;
  variant?: 'pregnant' | 'toddler';
  infant?: number;
  toddler?: number;
  newPregnant?: number;
  oldPregant?: number;
  type?: 'compact' | 'highlight' | 'full';
  loading?: boolean;
}

const CardInformation: React.FC<IProps> = ({ title, code, total, male, female, variant, infant, toddler, newPregnant, oldPregant, type = 'full', loading = false }) => {
  const isCompact = type === 'compact';
  const isHighlight = type === 'highlight';

  return (
    <Card
      title={!(isCompact || isHighlight) && title}
      bordered
      style={{ flex: 1, textAlign: isHighlight ? 'center' : undefined }}
      className={(isCompact || isHighlight) ? 'card-compact' : ''}
      loading={loading}
    >
      <div>
        {(isCompact || isHighlight) && (
          <div style={{ marginBottom: isHighlight ? 4 : 16, marginTop: -6 }}>
            <Typography.Text strong>{title}</Typography.Text>
          </div>
        )}
        <Card.Meta
          avatar={!isHighlight && (<Avatar shape="square" size={isCompact ? 48 : 60}>{code}</Avatar>)}
          title={<Typography.Title level={(isCompact || isHighlight) ? 5 : 4} type="success">{total}</Typography.Title>}
          description={!!(male !== undefined || female !== undefined) && (
            <Space align="center" size="middle">
              {male !== undefined && (<Typography.Text type="secondary" style={{ fontWeight: 400 }}>L: {male}</Typography.Text>)}
              {female !== undefined && (<Typography.Text type="secondary" style={{ fontWeight: 400 }}>P: {female}</Typography.Text>)}
            </Space>
          )}
        />
      </div>
      {variant === 'toddler' && (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 24 }}>
          <Card.Meta
            style={{ flex: 1 }}
            title={<Typography.Title level={5} style={{ color: '#AD4053' }}>{infant}</Typography.Title>}
            description={<Typography.Text type="secondary">0 - 24 Bln</Typography.Text>}
          />
          <Divider type='vertical' style={{ height: 48 }} />
          <Card.Meta
            style={{ flex: 1 }}
            title={<Typography.Title level={5} style={{ color: '#AD4053' }}>{toddler}</Typography.Title>}
            description={<Typography.Text type="secondary">25 - 60 Bln</Typography.Text>}
          />
        </div>
      )}
      {variant === 'pregnant' && (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 24 }}>
          <Card.Meta
            style={{ flex: 1 }}
            title={<Typography.Title level={5} style={{ color: '#AD4053' }}>{newPregnant}</Typography.Title>}
            description={<Typography.Text type="secondary">Ibu Hamil Baru</Typography.Text>}
          />
          <Divider type='vertical' style={{ height: 48 }} />
          <Card.Meta
            style={{ flex: 1 }}
            title={<Typography.Title level={5} style={{ color: '#AD4053' }}>{oldPregant}</Typography.Title>}
            description={<Typography.Text type="secondary">Ibu Hamil Lama</Typography.Text>}
          />
        </div>
      )}
    </Card>
  );
};

export default CardInformation;