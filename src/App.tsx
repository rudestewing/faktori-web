import { Button, ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <div id="app">
        <Button>hello there</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
