import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Home, Search, Settings, LogOut, User } from 'lucide-react';
import { BellOutlined } from '@ant-design/icons';
import {Homepage} from '../../home/homepage';
import hubgoIcon from './hubgo.png'
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    
    { key: '/dashboard', icon: <Home size={20} />, label: 'Home' },
    { key: '/dashboard/book', icon: <Package size={20} />, label: 'Book Parcel' },
    { key: '/dashboard/track', icon: <Search size={20} />, label: 'Track Parcel' },
    { key: '/dashboard/ola', icon: <Search size={20} />, label: 'ola Parcel' },
    // { key: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogOut size={16} />,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', backgroundColor: 'white', padding: '0 20px', justifyContent:'space-between', alignItems:'center' }}>

    <div >
      <img 
        src={hubgoIcon} 
        alt="HUBGO" 
        className="h-14"
        style={{ marginRight: '16px' }}
      />
    </div>
    
   
      <Menu 
        mode="horizontal"
        defaultSelectedKeys={['/']}
        style={{ height: '100%', width: '100%',justifyContent:'center' }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />

    

<Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Avatar style={{ backgroundColor: '#1677ff', cursor: 'pointer' }}>A</Avatar>
        </Dropdown>
</Header>

      <Layout>
        {/* <Sider 
          width={200} 
          theme="light" 
          collapsible 
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider> */}
        <Layout style={{ padding: '24px' }}>
          <Content className="bg-white p-6 rounded-lg min-h-[280px]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;