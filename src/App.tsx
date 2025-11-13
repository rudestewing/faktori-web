import { ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { RouterProvider } from 'react-router'
import router from './router'
import { colorPalette } from './configs/color.config'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
          colorPrimary: colorPalette.brand.primary[600],
          colorError: colorPalette.semantic.error[600],
          colorWarning: colorPalette.semantic.warning[600],
          colorSuccess: colorPalette.semantic.success[600],
          colorInfo: colorPalette.semantic.info[600],
          borderRadius: 5,
          colorTextBase: colorPalette.surface[900],
          fontSize: 14,
          controlHeight: 42,
        },
        components: {
          Menu: {
            // colorPrimaryActive: colorPalette.brand.primary[600],
            itemSelectedColor: colorPalette.brand.primary[800],
            itemHeight: 40,
          },
          Input: {
            fontSize: 16,
          },
          Select: {
            fontSize: 16,
          },
          InputNumber: {
            fontSize: 16,
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
