import Head from 'next/head';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Menu, Button, theme, Avatar, Typography } from 'antd';

const { Header, Sider, Content } = AntLayout;

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorWhite, colorBgBase, colorPrimary },
  } = theme.useToken();

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Posyhub | {title}</title>
      </Head>
      <AntLayout style={{ height: '100%' }}>
        <Sider collapsed={collapsed} style={{ backgroundColor: colorWhite }}>
          <div style={{ paddingInline: 24, paddingBlock: 16, display: 'inline-flex', gap: 8 }}>
            <Avatar>P</Avatar>
            {!collapsed && (<Typography.Title level={4} style={{ margin: 0 }}>Posyhub</Typography.Title>)}
          </div>
          <Menu
            style={{ backgroundColor: colorWhite }}
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <AntLayout>
          <Header style={{ padding: 0, background: colorWhite }}>
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            /> */}
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
