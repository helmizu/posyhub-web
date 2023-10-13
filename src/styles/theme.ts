import type { ThemeConfig } from 'antd';

type Theme = ThemeConfig & {
  token: ThemeConfig['token'] & Partial<{
    colorSecondary: string;
    colorDefault: string;
  }>
}

const theme: Theme = {
  token: {
    fontSize: 14,
    colorText: '#21272A',
    colorTextSecondary: '#697077',
    // colorBgBase: '#F4F7F5',
    colorPrimary: '#89DDAC',
    colorSecondary: '#C32541',
    colorDefault: '#999999',
    colorInfo: '#343849',
    colorSuccess: '#6CED60',
    colorWarning: '#ECBE53',
    colorError: '#f44336',
  },
  components: {
    Button: {
      paddingInline: 12,
      primaryShadow: 'none',
    }
  }
};

export default theme;
