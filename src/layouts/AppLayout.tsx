import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router'
import {
  ChartPie,
  Cog,
  Database,
  LayoutDashboard,
  Monitor,
  NotebookText,
  Package,
  User,
} from 'lucide-react'

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
          items={[
            {
              key: '/',
              label: 'Home',
              icon: <LayoutDashboard size={16} />,
            },
            // {
            //   key: '/formulation',
            //   label: 'Formulation',
            //   icon: <NotebookText size={16} />,
            // },
            // {
            //   key: '/procurement',
            //   label: 'Procurement',
            //   icon: <Database size={16} />,
            //   children: [
            //     {
            //       key: '/procurement/po',
            //       label: 'Purchase Order',
            //     },
            //   ],
            // },
            // {
            //   key: '/inventory',
            //   label: 'Inventory',
            //   icon: <Database size={16} />,
            //   children: [
            //     {
            //       key: '/inventory/material',
            //       label: 'Material Stock',
            //     },
            //     {
            //       key: '/inventory/product',
            //       label: 'Product Stock',
            //     },
            //   ],
            // },
            // {
            //   key: '/commercial',
            //   label: 'Commercial',
            //   icon: <Database size={16} />,
            //   children: [
            //     {
            //       key: '/commercial/so',
            //       label: 'Sales Order',
            //     },
            //     {
            //       key: '/commercial/delivery',
            //       label: 'Delivery Order',
            //     },
            //   ],
            // },
            // {
            //   key: '/production',
            //   label: 'Production',
            //   icon: <Package size={16} />,
            //   children: [
            //     {
            //       key: '/production/list',
            //       label: 'Production List',
            //     },
            //     {
            //       key: '/production/log',
            //       label: 'Production Log',
            //     },
            //   ],
            // },

            // {
            //   key: '/monitoring',
            //   label: 'Monitoring',
            //   icon: <Monitor size={16} />,
            //   children: [
            //     {
            //       key: '/monitoring/production',
            //       label: 'Monitor Production',
            //     },
            //   ],
            // },
            // {
            //   key: '/report',
            //   label: 'Report',
            //   icon: <ChartPie size={16} />,
            //   children: [
            //     {
            //       key: '/report/production',
            //       label: 'Production',
            //     },
            //     {
            //       key: '/report/material-usage',
            //       label: 'Material Usage',
            //     },
            //   ],
            // },
            // {
            //   key: '/master',
            //   label: 'Master',
            //   icon: <Database size={16} />,
            //   children: [
            //     {
            //       key: '/master/site',
            //       label: 'Sites',
            //     },
            //     {
            //       key: '/master/uom',
            //       label: 'UOM',
            //     },
            //     {
            //       key: '/master/status-production',
            //       label: 'Production Status',
            //     },
            //     {
            //       key: '/master/material',
            //       label: 'Material',
            //     },
            //     {
            //       key: '/master/supplier',
            //       label: 'Supplier',
            //     },
            //     {
            //       key: '/master/customer',
            //       label: 'Customer',
            //     },
            //   ],
            // },
            // {
            //   key: '/configuration',
            //   label: 'Configuration',
            //   icon: <Cog size={16} />,
            //   children: [
            //     {
            //       key: '/configuration/role',
            //       label: 'Role',
            //     },
            //     {
            //       key: '/configuration/user',
            //       label: 'User',
            //     },
            //   ],
            // },
          ]}
          className="overflow-y-auto nice-scroll"
          style={{
            height: '100%',
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            height: 60,
            padding: 0,
            background: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 5,
            lineHeight: 0,
          }}
        >
          <div className="flex h-full justify-between items-center px-4">
            <div>
              {/* <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  // width: 64,
                  // height: 64,
                }}
              /> */}
            </div>
            <div>
              <Button>
                <User />
              </Button>
            </div>
          </div>
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
