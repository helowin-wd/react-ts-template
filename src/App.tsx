import React from 'react';

// 引入UI组件
import { Button, Space } from 'antd';
// 引入组件图标
import { StepForwardOutlined } from '@ant-design/icons'

const App: React.FC = () => (
  <Space wrap>
    <Button type="primary">Primary Button</Button>
    <StepForwardOutlined style={{fontSize: '40px', color: 'pink'}}/>
  </Space>
);

export default App;
