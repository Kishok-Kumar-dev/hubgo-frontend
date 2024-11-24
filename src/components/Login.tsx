import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Divider, } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        navigate('/dashboard');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form.Item>
                </Form>
                <Divider ></Divider>
                <Row>
                    <Col span={5}></Col>
                <Col span={5}><Link to="/signup">Register </Link></Col>|
                <Col span={1}/>
                <Col> Forgot Password</Col>
            </Row>
            </div>
           
        </div>
    );
};

export default Login;
