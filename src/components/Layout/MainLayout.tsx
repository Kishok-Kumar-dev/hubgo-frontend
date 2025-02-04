import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Home, Search, Settings, LogOut, User } from 'lucide-react';
import {
  BellOutlined,
  SettingTwoTone,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import { Homepage } from '../../home/homepage';
import hubgoIcon from './hubgo.png';
import { logoutUser } from '../../service/AppService';
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<any>(null);

  useEffect(() => {
    const menuItem = [
      { key: '/dashboard', icon: <Home size={20} />, label: 'Home' },
    ];

    const res = localStorage.getItem('user');
    let userJson = JSON.parse(res || '{}');
    if (userJson && userJson.roles === 'ADMIN') {
      menuItem.push({
        key: '/dashboard/booking',
        icon: <Package size={20} />,
        label: 'Book Parcel',
      });
      menuItem.push({
        key: '/dashboard/track',
        icon: <Search size={20} />,
        label: 'Track Parcel',
      });
      menuItem.push({
        key: '/dashboard/settings',
        icon: <SettingTwoTone size={20} />,
        label: 'Settings',
      });
      menuItem.push({
        key: '/dashboard/operations',
        icon: <DeploymentUnitOutlined size={20} />,
        label: 'Operations',
      });
    } else if (userJson && userJson.roles === 'TRANSPORT') {
      menuItem.push({
        key: '/dashboard/booking',
        icon: <Package size={20} />,
        label: 'Bookings',
      });
      menuItem.push({
        key: '/dashboard/track',
        icon: <Search size={20} />,
        label: 'Track Parcel',
      });
      menuItem.push({
        key: '/dashboard/operations',
        icon: <DeploymentUnitOutlined size={20} />,
        label: 'Operations',
      });
    } else if (userJson && userJson.roles === 'DRIVER') {
      menuItem.push({
        key: '/dashboard/booking',
        icon: <Package size={20} />,
        label: 'Bookings',
      });
      menuItem.push({
        key: '/dashboard/track',
        icon: <Search size={20} />,
        label: 'Track Parcel',
      });
      menuItem.push({
        key: '/dashboard/operations',
        icon: <DeploymentUnitOutlined size={20} />,
        label: 'Operations',
      });
    }
    setMenuItems(menuItem);
  }, []);

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: (
        <LogOut
          size={16}
          onClick={() => {
            console.log('Logging out');
            localStorage.removeItem('jwtToken');
            navigate('/', { replace: true });
          }}
        />
      ),
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          backgroundColor: 'white',
          padding: '0 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
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
          style={{ height: '100%', width: '100%', justifyContent: 'center' }}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Avatar
            style={{ backgroundColor: '#1677ff', cursor: 'pointer' }}
          ></Avatar>
        </Dropdown>
      </Header>

      <Layout>
        <Layout style={{ padding: '0px' }}>
          <Content className="bg-white p-6 rounded-lg min-h-[280px]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
