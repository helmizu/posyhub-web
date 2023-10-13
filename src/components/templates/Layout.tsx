import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout as AntLayout, Menu, theme, Avatar, Typography, Dropdown, Button, Grid } from 'antd';
import { filterMenuByRole, findKeysForPath } from '@/utils/layout';
import { SIDEBAR } from '@/constants/layout';
import { UilAngleDown, UilSignout } from '@iconscout/react-unicons';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { swrCallApi } from '@/utils/network';

const { Header, Sider, Content } = AntLayout;

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

const MENU_ITEMS = [
  {
    label: <Link href="/logout">Logout</Link>,
    key: 'logout',
    icon: <UilSignout size={16} />
  },
];

const mapMenu = (_menu: any[], collapsed = false): any[] | undefined => {
  if (!_menu || !_menu?.length) return undefined;
  return _menu.map(menu => {
    if (!menu.label) return menu;
    return {
      key: menu.key,
      icon: menu.icon ? (
        <div style={{ position: 'relative' }}>
          {React.createElement(menu.icon, collapsed ? { style: { position: 'absolute', left: -6, top: -18 } } : {})}
        </div>
      ) : undefined,
      children: mapMenu(menu?.children),
      label: menu.path ? (
        <Link href={menu.path}>{menu.label}</Link>
      ) : menu.label,
    };
  });
};

interface IProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  const { token: { colorWhite, colorTextSecondary, colorPrimary } } = theme.useToken();
  const { data: profile = {} } = useSWR('/api/user/profile', swrCallApi);

  const router = useRouter();
  const activePath = router.pathname;
  const mappedSidebar = filterMenuByRole(SIDEBAR as any, profile?.role?.toLowerCase());
  const [parentKey, childKey] = findKeysForPath(mappedSidebar, activePath) ?? [];
  const activeKey = childKey || parentKey;

  const { data: user } = useSession({ required: true, onUnauthenticated: () => { router.push('/login'); } });

  const { xs, sm, md } = Grid.useBreakpoint();
  const collapsed = xs || (sm && !md);

  return (
    <>
      <Head>
        <title>Posyhub | {title || ''}</title>
      </Head>
      <AntLayout>
        <Sider style={{ backgroundColor: colorWhite, height: '100vh' }} collapsed={collapsed}>
          <div style={{ paddingInline: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 8, height: 64 }}>
            <Avatar size={40} src="/logo-circle.png" style={{ backgroundColor: colorPrimary, minWidth: 40, minHeight: 40 }} />
            {!collapsed && (<Typography.Title level={3}>{collapsed ? 'Ph' : 'Posyhub'}</Typography.Title>)}
          </div>
          <Menu
            style={{ backgroundColor: colorWhite }}
            mode="inline"
            selectedKeys={[activeKey]}
            items={mapMenu(mappedSidebar, collapsed)}
          />
        </Sider>
        <AntLayout>
          <Header style={{ background: colorWhite, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingInline: 24, height: 64 }}>
            {!!user && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', }}>
                <Avatar size="large" style={{ backgroundColor: colorPrimary }}>{profile?.name?.split(' ')?.map((item: string) => item?.at(0) || '')?.slice(0, 2)?.join('') || '?'}</Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                  <Typography.Text strong>{profile?.name || ''}</Typography.Text>
                  <Typography.Text style={{ color: colorTextSecondary, fontSize: 14 }}>{profile?.role || 'Admin'}</Typography.Text>
                </div>
                <Dropdown trigger={['click']} menu={{ items: MENU_ITEMS, style: { width: 160 } }}>
                  <Button type="text" icon={<UilAngleDown />} style={{ borderRadius: '50%' }} />
                </Dropdown>
              </div>
            )}
          </Header>
          <Content
            style={{
              padding: 24,
              height: 'calc(100vh - 64px)',
              background: '#EDEDED',
              overflowY: 'auto',
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
