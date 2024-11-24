import React from 'react';

import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Input, Layout, Menu , Row, Col} from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const Sidebar: React.FC = () => {
    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'white', padding: '0 20px' }}>
    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>HubGo</div>
    <Menu mode="horizontal" style={{ flexGrow: 1, borderBottom: 0 , marginLeft:'28%'}}>
      <Menu.Item key="dashboard">  <Link to="/dashboard">Dashboard</Link></Menu.Item>
      <Menu.Item key="shipping"><Link to="/dashboard/shipping"> Shipping</Link></Menu.Item>
      <Menu.Item key="tracking"><Link to="/dashboard/tracking">Tracking</Link></Menu.Item>
      <Menu.Item key="Users"><Link to="/dashboard/users">Users</Link></Menu.Item>
      {/* <Menu.Item key="settings">Settings</Menu.Item> */}
    </Menu>
  
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    
      <BellOutlined style={{ fontSize: '20px' }} />
      <Avatar src="https://via.placeholder.com/150" />
    </div>
  </Header>
    );
};

export default Sidebar;
