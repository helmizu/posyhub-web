import React from 'react';
import { Typography, theme } from 'antd';
import { CloseOutlined, InfoCircleFilled } from '@ant-design/icons';

export interface IFieldProps {
  label: string;
  description?: string | React.ReactNode;
  required?: boolean;
  helper?: React.ReactNode;
  error?: string;
  children: React.ReactElement;
  direction?: 'row' | 'column';
  maxLength?: number;
  valueLength?: number;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export const Field: React.FC<IFieldProps> = ({
  label,
  description,
  required,
  helper,
  error,
  children,
  direction = 'column',
  maxLength,
  valueLength,
  style,
  containerStyle,
}) => {
  const { token: { colorTextDescription, colorErrorText, colorWarningBg } } = theme.useToken();
  return (
    <div style={{ display: 'flex', flexGrow: 1, gap: direction === 'row' ? 32 : 4, flexDirection: direction, ...containerStyle }}>
      {!!label && (
        <div style={{ width: direction === 'row' ? 300 : 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Typography.Text>{label}{required && (<span style={{ color: colorErrorText, fontSize: 14 }}> *</span>)}</Typography.Text>
          {!!description && (
            <Typography.Text style={{ fontSize: 12, color: colorTextDescription, whiteSpace: 'pre-line' }}>
              {description}
            </Typography.Text>
          )}
        </div>
      )}
      <div style={{ width: direction === 'row' ? 300 : 'auto', display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1, ...style }}>
        {React.cloneElement(children, { status: !!error && 'error' })}
        {(!!valueLength?.toString() && !!maxLength?.toString()) && (
          <div style={{ display: 'inline-flex', justifyContent: 'flex-end', gap: 4 }}>
            <Typography.Text style={{ fontSize: 12, color: colorTextDescription }}>
              {valueLength} / {maxLength}
            </Typography.Text>
          </div>
        )}
        {!!error && (
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4 }}>
            <CloseOutlined rev={undefined} style={{ marginTop: 2, color: colorErrorText, fontSize: 14 }} />
            <Typography.Text style={{ fontSize: 12, color: colorErrorText }}>
              {error}
            </Typography.Text>
          </div>
        )}
        {!!helper && (
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4 }}>
            <InfoCircleFilled rev={undefined} style={{ marginTop: 2, color: colorWarningBg, fontSize: 14 }} />
            <Typography.Text style={{ fontSize: 12, color: colorTextDescription }}>
              {helper}
            </Typography.Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;
