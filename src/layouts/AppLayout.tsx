import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

export default function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'sticky',
          top: 0,
          bottom: 0,
          height: '100vh',
          paddingBottom: 60,
        }}
        theme="light"
      >
        <div className="h-[60px] p-4">
          <div className="font-bold tracking-wider text-gray-400 text-center">
            {collapsed ? 'F' : 'Faktori'}
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={Array.from({
            length: 20,
          }).map((_, index) => ({
            key: String(index + 1),
            label: `Menu Item ${index + 1}`,
          }))}
          className="overflow-y-auto nice-scroll"
          style={{
            height: '100%',
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 5,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="my-6 mx-4 p-4"
          style={{
            // margin: '24px 16px',
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
