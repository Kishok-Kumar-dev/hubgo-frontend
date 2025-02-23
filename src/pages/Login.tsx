import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Divider, notification, } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/AppService';


const { Title } = Typography;
interface ChildProps {
    Spinner: (message: boolean) => void;
  }

const Login: React.FC<ChildProps> = ({Spinner}) => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        Spinner(true);
        console.log('Success:', values);

        if(values.loginParam.includes('@')){ 
            values.email= values.loginParam;
        }else{
            values.phoneNumber= values.loginParam;
        }
        loginUser((values)).then((res:any) => {
            Spinner(false);
            console.log('Login successful:', res);
            localStorage.setItem('jwtToken', res.token);
            localStorage.setItem('user', JSON.stringify(res));
            notification.success({ message: 'Login successful' });
            navigate('/dashboard');
        }).catch((err) => {
            Spinner(false);
            if(err?.response?.data=="Invalid phone number, email, or password."){
                notification.error({ message: 'Invalid phone number, email, or password.' });
            }else{
                console.log('Login Failed:', err);
                notification.error({ message:"Please Retry or Contact HubGo"});
            }
        });
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center',   background: 'white',  marginTop:'40px'}}>
            <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                <Title level={3} style={{ textAlign: 'left' }}>Login Your Account</Title>
                <br/>
                <Form name="login" onFinish={onFinish} layout="vertical"
                >
                    <Form.Item name="loginParam" label="Email/MobileNo" rules={[{ required: true, message: 'Email or Mobile No!' }]}>
                        <Input placeholder="Enter your Email/MobileNo" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password' }]}>
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
