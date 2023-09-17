import React, { useState } from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/MainMenu'

const { Header, Content, Footer, Sider } = Layout

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const BreadItems = [
    {
      title: 'User'
    },
    {
      title: 'Bill'
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <MainMenu />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
          <Breadcrumb style={{ lineHeight: '64px' }} separator="/" items={BreadItems} />
        </Header>
        <Content style={{ margin: '16px 16px 0' }}>
          <div style={{ height: '100%', padding: 24, minHeight: 360, background: colorBgContainer }}>
            {/* 窗口部分 */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Home
