import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Divider, notification, } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/AppService';


const { Title } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);

        if(values.loginParam.includes('@')){ 
            values.email= values.loginParam;
        }else{
            values.phoneNumber= values.loginParam;
        }
        loginUser((values)).then((res) => {
            console.log('Login successful:', res);
            notification.success({ message: 'Login successful' });
            navigate('/dashboard');
        }).catch((err) => {

            console.log('Login Failed:', err);
            notification.success({ message:err.toString() });
            
        });
        
        
    
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
                <Form name="login" onFinish={onFinish} layout="vertical"
                >
                    <Form.Item name="loginParam" label="Email/MobileNo" rules={[{ required: true, message: 'Please enter your Email/MobileNo!' }]}>
                        <Input placeholder="Enter your Email/MobileNo" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form.Item>
                </Form>
               
            </div>
           
        </div>
    );
};

export default Login;
