import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Menu, theme, Avatar, Typography, Dropdown, Button } from 'antd';
import { filterMenuByRole, findKeysForPath } from '@/utils/layout';
import { SIDEBAR } from '@/constants/layout';
import { UilAngleDown, UilSignout } from '@iconscout/react-unicons';

const { Header, Sider, Content } = AntLayout;

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

const ROLE = 'admin';
const MENU_ITEMS = [
  {
    label: <Link href="/logout">Logout</Link>,
    key: 'logout',
    icon: <UilSignout size={16} />
  },
];

const mapMenu = (_menu: any[]): any[] | undefined => {
  if (!_menu || !_menu?.length) return undefined;
  return _menu.map(menu => {
    if (!menu.label) return menu;
    return {
      key: menu.key,
      icon: menu.icon ? React.createElement(menu.icon) : undefined,
      children: mapMenu(menu?.children),
      label: menu.path ? (
        <Link href={menu.path}>{menu.label}</Link>
      ) : menu.label,
    };
  });
};

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  const { token: { colorWhite, colorTextSecondary, colorPrimary } } = theme.useToken();
  const router = useRouter();
  const activePath = router.pathname;
  const mappedSidebar = filterMenuByRole(SIDEBAR as any, ROLE);
  const [parentKey, childKey] = findKeysForPath(mappedSidebar, activePath) ?? [];
  const activeKey = childKey || parentKey;

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Posyhub | {title}</title>
      </Head>
      <AntLayout style={{ height: '100%' }}>
        <Sider style={{ backgroundColor: colorWhite }}>
          <div style={{ paddingInline: 24, paddingBlock: 16, display: 'inline-flex', gap: 8 }}>
            <Avatar>P</Avatar>
            <Typography.Title level={4}>Posyhub</Typography.Title>
          </div>
          <Menu
            style={{ backgroundColor: colorWhite }}
            mode="inline"
            selectedKeys={[activeKey]}
            items={mapMenu(mappedSidebar)}
          />
        </Sider>
        <AntLayout>
          <Header style={{ background: colorWhite, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingInline: 24 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', }}>
              <Avatar size="large" style={{ backgroundColor: colorPrimary }}>N</Avatar>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                <Typography.Text strong>Name</Typography.Text>
                <Typography.Text style={{ color: colorTextSecondary, fontSize: 14 }}>Username</Typography.Text>
              </div>
              <Dropdown trigger={['click']} menu={{ items: MENU_ITEMS }}>
                <Button type="text" icon={<UilAngleDown />} style={{ borderRadius: '50%' }} />
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: '#EDEDED',
              height: '100%'
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
