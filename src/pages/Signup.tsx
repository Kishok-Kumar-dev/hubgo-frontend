import React from 'react';
import { Form, Input, Button, Typography,notification } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signup: React.FC = () => {
    const onFinish = (values: any) => {
        // Simulating API call
        console.log(values);
        setTimeout(() => {
            if (Math.random() > 0.5) {
                notification.success({
                    message: 'Registration successful!',
                    description: 'Your account has been registered successfully.'
                });
            } else {
                notification.error({
                    message: 'Registration failed',
                    description: 'An error occurred during registration. Please try again later.'
                });
            }
        }, 500);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Register</Title>
                <Form name="signup" onFinish={onFinish} layout="vertical">
        
                    <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: 'Please enter your Business name!' }]}>
                        <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input placeholder="Enter your email" type='email' />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number!',}]}>
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Enter your phone number"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Register</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
