import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header >
                <Sidebar />
            </Header>
            <Layout>
                <Content style={{ padding: 24 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
