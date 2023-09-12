import type { ThemeConfig } from 'antd';

type Theme = ThemeConfig & {
  token: ThemeConfig['token'] & Partial<{
    colorSecondary: string;
    colorDefault: string;
  }>
}

const theme: Theme = {
  token: {
    fontSize: 16,
    colorText: '#21272A',
    colorTextSecondary: '#697077',
    colorBgBase: '#F4F7F5',
    colorPrimary: '#7BAF59',
    colorSecondary: '#AD4053',
    colorDefault: '#999999',
    colorInfo: '#343849',
    colorSuccess: '#5baf53',
    colorWarning: '#d89f1b',
    colorError: '#f44336',
  },
};

export default theme;
