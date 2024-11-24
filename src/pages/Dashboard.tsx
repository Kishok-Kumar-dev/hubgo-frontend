import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Statistic, Table } from 'antd';
import React, { useEffect, useState } from 'react';

// const { Title } = Typography;

const Dashboard: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([
        {
            key: '1',
            trackingId: '#RQ7487',
            deliver: 'Wade Warren',
            shippedDate: '22 June 2024',
            country: 'United States',
            weight: '2.8kg',
            price: '$24.05',
            status: 'On the Way',
        },
        {
            key: '2',
            trackingId: '#RQ7488',
            deliver: 'Kristin Watson',
            shippedDate: '21 June 2024',
            country: 'India',
            weight: '3.4kg',
            price: '$32.02',
            status: 'In Transit',
        },
    ]);
    const filteredData = data.filter((item: any) =>
        item.trackingId.toLowerCase().includes(searchText.toLowerCase())
    );
    useEffect(()=>{
        setData([
            {
                key: '1',
                trackingId: '#RQ7487',
                deliver: 'Wade Warren',
                shippedDate: '22 June 2024',
                country: 'United States',
                weight: '2.8kg',
                price: '$24.05',
                status: 'On the Way',
            },
            {
                key: '2',
                trackingId: '#RQ7488',
                deliver: 'Kristin Watson',
                shippedDate: '21 June 2024',
                country: 'India',
                weight: '3.4kg',
                price: '$32.02',
                status: 'In Transit',
            },
        ]);
    });


    const columns = [
        { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
        { title: 'Deliver', dataIndex: 'deliver', key: 'deliver' },
        { title: 'Shipped Date', dataIndex: 'shippedDate', key: 'shippedDate' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'Weight', dataIndex: 'weight', key: 'weight' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    return <>


      
        <Row gutter={16} style={{ margin: '20px 0' }}>
            {/* <Col span={8}>
                <Card title="Total Shipping" bordered={false}>
                    <h2>248</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Pending Packages" bordered={false}>
                    <h2>64</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Delivery Shipments" bordered={false}>
                    <h2>32</h2>
                </Card>
            </Col> */}
            <Col span={2}></Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Total Shipment"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Pending Packages"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Delivered"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>

        <div>
            <Input
                placeholder="Search by Tracking ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: '20px' , width:'15%'}}
            />
            <Table dataSource={filteredData} columns={columns} />
        </div>

   

    </>
};

export default Dashboard;
