import React, { useState,useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Home, Search, Settings, LogOut, User } from 'lucide-react';
import { BellOutlined, SettingTwoTone , DeploymentUnitOutlined} from '@ant-design/icons';
import {Homepage} from '../../home/homepage';
import hubgoIcon from './hubgo.png'
import { logoutUser } from '../../service/AppService';
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<any>(null);

  useEffect(() => {
    const menuItem = [
      { key: '/dashboard', icon: <Home size={20} />, label: 'Home' }
    ];

    const res = localStorage.getItem('user');
    let userJson = JSON.parse(res || '{}');
    let transport =['TRANSPORT', 'BOOKING_AGENT', 'TRANSPORT_HUB']
    let userRoleValue=userJson?.roles;
    if ( userRoleValue === 'ADMIN') {
      menuItem.push({
        key: '/dashboard/booking',
        icon: <Package size={20} />,
        label: 'Book Parcel',
      });
      menuItem.push(   { key: '/dashboard/trackorder', icon: <Search size={20} />, label: 'TrackOrder' },);

      menuItem.push({
        key: '/dashboard/settings',
        icon: <SettingTwoTone size={20} />,
        label: 'Settings',
      });

      menuItem.push({
        key: '/dashboard/pricesettings',
        icon: <SettingTwoTone size={20} />,
        label: 'Price Setting',
      });
    } else if (userRoleValue && transport.includes(userRoleValue) ) {
      menuItem.push({
        key: '/dashboard/booking',
        icon: <Package size={20} />,
        label: 'Bookings',
      });
      menuItem.push(   { key: '/dashboard/trackorder', icon: <Search size={20} />, label: 'TrackOrder' },);

      // menuItem.push({
      //   key: '/dashboard/track',
      //   icon: <Search size={20} />,
      //   label: 'Track Parcel',
      // });
      // menuItem.push({
      //   key: '/dashboard/operations',
      //   icon: <DeploymentUnitOutlined size={20} />,
      //   label: 'Operations',
      // });
    } else if (userRoleValue && [ 'DRIVER', 'BIKE_CAPTAIN'].includes(userRoleValue)) {
      // menuItem.push({
      //   key: '/dashboard/booking',
      //   icon: <Package size={20} />,
      //   label: 'Bookings',
      // });
      menuItem.push(   { key: '/dashboard/trackorder', icon: <Search size={20} />, label: 'TrackOrder' },);

      // menuItem.push({
      //   key: '/dashboard/operations',
      //   icon: <DeploymentUnitOutlined size={20} />,
      //   label: 'Operations',
      // });
    }
    setMenuItems(menuItem);
  }, []);

  const userMenuItems = [
    // {
    //   key: 'profile',
    //   label: 'Profile',
    //   icon: <User size={12} />,
    // },
    {
      key: 'logout',
      label: 'Logout',
      icon: (
        <LogOut
          size={16}
        />
      ),
      danger: true,
      onClick: () => {
        console.log('Logging out');
        localStorage.removeItem('jwtToken');
        navigate('/', { replace: true });
      },
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
          >
            <User size={18} />
          </Avatar>
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
