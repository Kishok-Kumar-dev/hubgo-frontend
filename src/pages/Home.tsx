import React, { useState } from 'react';
import { Card, Row, Col, List, Button, Typography, Space, Tag, Input, Table } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, BellOutlined, UserOutlined, PlusOutlined ,ShoppingCartOutlined} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Text, Title } = Typography;

// Order type
type Order = {
  id: number;
  name: string;
  status: 'Pending' | 'Delivered';
  date: string;
  price: number;
};

const Home: React.FC = () => {
  // Mock data
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, name: 'Electronics', status: 'Pending', date: '25 Jan 2020', price: 70 },
    { id: 2, name: 'Food Products', status: 'Delivered', date: '21 Jan 2020', price: 78 },
    { id: 3, name: 'Luccage', status: 'Pending', date: '29 Dec 2019', price: 110 },
  ]);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const updateStatus = (id: number, newStatus: 'Pending' | 'Delivered') => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Booked Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Estimated Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Delivered' ? 'green' : 'orange'} style={{fontSize:'15px'}}>{status}</Tag>
      ),
    },
  ];

  return (
    <>
    
  <Row gutter={[16, 16]}>
        {/* Summary Cards */}
        <Col xs={24} sm={8}>
          <Card  >
            <Text> <ShoppingCartOutlined></ShoppingCartOutlined>     Total Orders</Text>
            <h2 style={{ fontSize: '2em', margin: '10px 0' }}>{10}</h2>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card  >
            <Text><ClockCircleOutlined/>Pending Orders</Text>
            <h2 style={{ color: '#000', fontSize: '2em', margin: '10px 0' }}>{20}</h2>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card  >
            <Text> <CheckCircleOutlined /> Delivered</Text>
            <h2 style={{  fontSize: '2em', margin: '10px 0' }}>{30}</h2>
          </Card>
        </Col>
        </Row>

<br/>
        
       {isMobile ? (

        <>
          <List
            dataSource={orders}
            renderItem={(order) => (
              <List.Item
                style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}
              
              >
                <List.Item.Meta
                  title={<Text style={{fontSize:'15px'}} strong>Waybill#HUBGO{order.id}</Text>}
                  description={
                    <Space direction="vertical">
             
                      <Text style={{fontSize:'15px'}}>{order.date}</Text>
                    </Space>
                  }
                />
                <Tag color={order.status === 'Delivered' ? 'green' : 'orange'} style={{fontSize:'20px'}}>
                        {order.status}
                      </Tag>
              </List.Item>
            )}
          />
          </>
        ) : (
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        )}
    </>
  );
};

export default Home;
