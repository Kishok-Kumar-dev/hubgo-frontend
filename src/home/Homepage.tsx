import { Header } from 'antd/es/layout/layout'
import { Layout, Menu, Button, Typography, Row, Col, Card, Steps, Space, Input, Form, Divider } from 'antd';
import React, { useState } from 'react'
const { Title, Paragraph, Text, Link } = Typography;
const { Footer: AntFooter } = Layout;
import hubgoIcon from './hubgo.png';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Auto from './autopng.png'
import hubgocarousel from './hubgocarousel.png';
import {Link as RouterLink }from 'react-router-dom';
import { GiftOutlined, RocketOutlined, ClockCircleOutlined, SafetyCertificateOutlined, DollarOutlined, PhoneOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';
const features = [
  {
    icon: <ClockCircleOutlined className="text-4xl text-blue-600" />,
    title: "Same Day Delivery",
    description: "Get your parcels delivered on the same day they arrive at the bus terminal"
  },
  {
    icon: <SafetyCertificateOutlined className="text-4xl text-blue-600" />,
    title: "Safe & Secure",
    description: "Your parcels are handled with utmost care and fully insured"
  },
  {
    icon: <DollarOutlined className="text-4xl text-blue-600" />,
    title: "Affordable Rates",
    description: "Competitive pricing with no hidden charges"
  },
  {
    icon: <PhoneOutlined className="text-4xl text-blue-600" />,
    title: "24/7 Support",
    description: "Our customer service team is always ready to help"
  }
];
const steps = [

  {
    title: 'Book Delivery',
    description: 'Book Door Delivery At Transport',
    icon: <PhoneOutlined />
  },  {
    title: 'Parcel Arrives',
    description: 'Your parcel arrives at the central bus terminal',
    icon: <GiftOutlined />
  },
  {
    title: 'We Collect',
    description: 'Our agent picks up your parcel from the terminal',
    icon: <CarOutlined />
  },
  {
    title: 'Door Delivery',
    description: 'Receive your parcel at your doorstep',
    icon: <SmileOutlined />
  }
];
const { Search } = Input;

const handleSearch = (value:any) => {
  console.log("Search for:", value); 
};
const onFinish= (value:any)=>{
  console.log(value);
}
const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f7f7f7",
    textAlign: "center"as const,
  },
  textContent: {
    color: "#002766",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  highlight: {
    color: "#f57c00", // Orange for "Go"
  },
  subtitle: {
    fontSize: "18px",
    color: "#595959",
  },
  searchBox: {
    marginTop: "20px",
    maxWidth: "400px",
    width: "100%",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
};

export default function Homepage() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const [isSignUp, setIsSignUp] = useState<Boolean>(false);
  const [homepage, setHomePage] = useState<Boolean>(true);


  const isMobileView = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  return (
    <Layout>
      <Header className="bg-white shadow-sm fixed w-full z-10 flex justify-between items-center px-8">
        <div className="flex items-center">
          
          <img
            src={hubgoIcon}
            alt="HUBGO"
            className="h-14"
            style={{ marginRight: '16px' }} onClick={()=>{setIsSignUp(false);setIsLogin(false);setHomePage(true)}}
          />
  
        </div>
        <div className="flex gap-4">
          <Button type="text" onClick={() => window.open(`tel:+917402015542`, '_self')}>Contact Us</Button>
          <Button type="text" onClick={() => {
            setIsLogin(true); setHomePage(false); setIsSignUp(false);
          }}>Login</Button>
          <Button type="primary" onClick={() => {
            setIsSignUp(true); setHomePage(false); setIsLogin(false);
          }}>Grow with Us</Button>

        </div>
      </Header>
      <Layout.Content style={{background:'white'}}>
 

        {homepage && !isMobileView() &&
          <div style={styles.container}>
          <Row justify="center" align="middle" style={{background:'white'}}>
          <Col xs={24} sm={24} md={12}>
              <img
                src={Auto}
                alt="HubGo Delivery"
                style={styles.image}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div style={styles.textContent}>
                <h1 style={styles.title}>
                  HUB<span style={styles.highlight}>GO</span>, YOUR INTRA-CITY DELIVERY EXPERT
                </h1>
                <p style={styles.subtitle}>Delivering to your door step</p>
                <Search
                  placeholder="Enter tracking number"
                  allowClear
                  enterButton="Track Now"
                  size="large"
                  onSearch={handleSearch}
                  style={styles.searchBox}
                />
              </div>
            </Col>      
          </Row>
        </div>}
        {homepage && isMobileView() &&
          <div style={styles.container}>
          <Row justify="center" align="middle" style={{background:'white'}}>
          <Col xs={24} sm={24} md={12}>
              <img
                src={Auto}
                alt="HubGo Delivery"
                style={styles.image}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div style={styles.textContent}>
                <h1 style={styles.title}>
                  HUB<span style={styles.highlight}>GO</span>, YOUR INTRA-CITY DELIVERY EXPERT
                </h1>
                <p style={styles.subtitle}>Delivering to your door step</p>
                <Search
                  placeholder="Enter tracking number"
                  allowClear
                  enterButton="Track Now"
                  size="large"
                  onSearch={handleSearch}
                  style={styles.searchBox}
                />
              </div>
            </Col>      
          </Row>
        </div>}

        {isMobileView() && isSignUp &&
          <div >
            <Signup />


          </div>}
        {isMobileView() && isLogin && <div>


          <Login></Login>
        </div>}


        {(isSignUp || isLogin) && !isMobileView() &&
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center h-screen" style={{ marginLeft: '35px', marginTop: '23px' }}>
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold">Welcome to HubGo</h1>
              <p className="text-lg text-gray-600 max-w-xl">
                We provide last mile delivery services for bus terminal parcels.
              </p>
              <Space>
                <Button type="primary" size="large" icon={<RocketOutlined />}>
                  Book Delivery Now
                </Button>
                <Button size="large">Track Your Parcel</Button>
              </Space>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              {isLogin ? (
                <Login />
              ) : (
                <Signup />
              )}
            </div>
          </div>



        }


        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Title level={2} className="text-center mb-12">
              Why Choose HubGo
            </Title>
            <Row gutter={[32, 32]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <div className="mb-4">{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Text className="text-gray-600">{feature.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Title level={2} className="text-center mb-12">
              How It Works
            </Title>
            <Steps
              items={steps}
              className="max-w-4xl mx-auto"
              progressDot
            />
          </div>
        </div>
        <div className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <Title level={2} className="!text-white mb-6">
              Ready to Get Started?
            </Title>
            <Paragraph className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience hassle-free parcel delivery from bus terminal to your doorstep.
              Join thousands of satisfied customers today!
            </Paragraph>
            <Button
              type="default"
              size="large"
              icon={<RocketOutlined />}
              className="bg-white hover:bg-gray-100"
            >
              Book Your First Delivery
            </Button>
          </div>
        </div>
      </Layout.Content>
      <AntFooter className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} className="py-12">
            <Col xs={24} sm={12} lg={8}>
              <Space className="mb-4">
                <img
                  src={hubgoIcon}
                  alt="HUBGO"
                  className="h-14"
                  style={{ marginRight: '16px' }}
                />
              </Space>
              <Text className="block mb-4" style={{ color: 'white' }}>
                Making last-mile delivery seamless and convenient for everyone.
              </Text>
            </Col>
            <Col xs={24} sm={12} lg={4} style={{ color: 'white' }}>
              <Title level={5} className="!text-white">Company</Title>
              <Space direction="vertical">
                <Link className="text-gray-300">About Us</Link>
                <Link className="text-gray-300">Careers</Link>
                <Link className="text-gray-300">Contact</Link>
              </Space>
            </Col>
            <Col xs={24} sm={12} lg={4} style={{ color: 'white' }}>
              <Title level={5} className="!text-white">Services</Title>
              <Space direction="vertical">
                <Link className="text-gray-300">Delivery</Link>
                <Link className="text-gray-300">Tracking</Link>
                <Link className="text-gray-300">Pricing</Link>
              </Space>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Title level={5} className="!text-white">Contact Us</Title>
              <Text className="block" style={{ color: 'white' }}>Email: hubgochennai@gmail.com</Text>
              <Text className="block" style={{ color: 'white' }}>Phone: (91)7402015542</Text>
            </Col>
          </Row>
          <div className="border-t border-gray-800 pt-8 pb-4 text-center">
            <Text className="text-gray-400">
              © 2025 HubGo. All rights reserved.
            </Text>
          </div>
        </div>
      </AntFooter>
    </Layout>
  )
}


