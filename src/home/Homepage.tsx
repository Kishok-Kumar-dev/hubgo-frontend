import { Button, Card, Col, Divider, Form, Input, Layout, notification, Row, Spin, Tag, Timeline, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxPlotOutlined, PhoneOutlined, PhoneTwoTone } from '@ant-design/icons';
import howitworks from '../components/asserts/howitworks.png';
import Icon from '../components/asserts/hubgo.svg';
import loginImg from '../components/asserts/login.png';
import signupImg from '../components/asserts/signup.png';
import whatproblem from '../components/asserts/whatproblem.png';
import whychoose from '../components/asserts/whychooseus.png';
import Footerr from '../home/Footer';
import Login from '../pages/Login';
import { getData, postData } from '../service/AppService';
import { Package, Truck, MapPin, Box, Clock, Phone, X } from 'lucide-react';
import Auto from './autopng.png';
// import Title from 'antd/es/typography/Title';
const { Title, Text } = Typography;
const { Search } = Input;


const onFinish = (value: any) => {
  console.log(value);
}


const styles = {
  container: {
    padding: "40px",
    backgroundColor: "white",
    textAlign: "center" as const,
  },
  textContent: {
    color: "#002766",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  highlight: {
    color: "#f57c00",
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
  signup: {
    maxWidth: "100%",
    Padding: '20px',
    backgroundColor: "white",
    height: "auto",
  },
};

export default function Homepage() {
  const [page, setPage] = useState<any>('homepage');
  const isMobileView = () => {
    return window.innerWidth <= 768;
  };
  const navigate= useNavigate();
  const [searchText, setSearchText] = useState('');
  
  const [trackingDetails, setTrackingDetails] = useState<any>(null);
  

  const [inquiryForm] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(false);
    const res = localStorage.getItem('user');
    let userJson = JSON.parse(res || '{}');
    if(userJson?.roles && localStorage.getItem('jwtToken')){
      navigate('/dashboard');


    }
  },[]);
    const handleSearch = (trackingId: string) => {
      if(trackingId){
      setLoading(true);
      getData(`/api/booking/track-details?orderId=${trackingId}`)
        .then((res: any) => {
          setTrackingDetails(res);
      
  
          notification.success({
            message: 'Order Found',
            description: 'Tracking details loaded successfully',
          });
        })
        .catch(() => {
          notification.error({ message: 'Order Not Found', description: 'No order found with the provided tracking ID' });
        }).finally(()=>{
          setLoading(false);
        })
      }
    };
    const clearResults = () => {
      setTrackingDetails(null);
    };
  

  const onEnquiryFinish = (value: any) => {
    setLoading(true);
    console.log(value);

    postData("/api/inquiries", value).then((res) => {
        inquiryForm.resetFields();
        notification.success({
          message: "Registration successful!",
          description: "HubGo Team will contact you soon.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Registration failed!",
          description: "Please Call HubGo.",
        });
      })
      .finally(() => {
        setLoading(false); 
      });
  };
  const SpinnerVal = (val: boolean) => {
    console.log(val);
    console.log(val);
    setLoading(val);
  }
  return (
    <Layout>
      <Header className="bg-white shadow-sm fixed w-full z-10 flex justify-between items-center px-8">
        <div className="flex items-center">

          <img
            src={Icon}
            alt="HUBGO"
            className={isMobileView() ? 'h-6' : 'h-10'}

            onClick={() => { setPage('homepage') }}
          />

        </div>
        <div className="flex gap-4">

          <Button type="text" onClick={() => {
            setPage('login');
          }}>Login</Button>
          <Button type="primary" onClick={() => { setPage('signup'); }}>Register</Button>

        </div>
      </Header>

      <Layout.Content style={{ background: 'white' }}>
        <Spin spinning={loading} size="large">


          {page == 'homepage' && !isMobileView() &&
            <div style={styles.container}>
              <Row justify="center" align="middle" style={{ background: 'white' }}>
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
              {trackingDetails && <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trackingDetails && (
          <div className="space-y-8 relative">
            {/* Close Button */}
            <button
              onClick={clearResults}
              className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close tracking results"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-500" />
                Order Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">{trackingDetails.orderId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Waybill:</span>
                    <span className="font-semibold">{trackingDetails.shipmentTrackingDetails.waybillId}</span>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Sender Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderMobileNo || 'N/A'}</span>
                  </div>
                </div>

                {/* Receiver Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Receiver Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverMobileNo || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-500" />
                Tracking Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {trackingDetails.shipmentTrackingDetails.transportBooked && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Order Booked</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.transportBooked).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.inTransit && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Departed at Transport Hub</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.inTransit).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
     

                  {trackingDetails.shipmentTrackingDetails.outForDelivery && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Out for Delivery</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.outForDelivery).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.delivered && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Delivered</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.delivered).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Box className="h-6 w-6 text-orange-500" />
                Package Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trackingDetails.shipmentProductDetails.map((pkg: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Box className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{pkg.packageId}</h4>
                            <p className="text-sm text-gray-500">{pkg.productContent || 'N/A'}</p>
                          </div>
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {pkg.productSize}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="font-medium">{pkg.productWeight} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium">{pkg.productQuantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-medium">{pkg.productValue ? `₹${pkg.productValue}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Charges</p>
                            <p className="font-medium">
                              {pkg.transportCharges && pkg.hubgoCharges 
                                ? `₹${pkg.transportCharges + pkg.hubgoCharges}`
                                : 'N/A'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>}
            </div>}
          {page == 'homepage' && isMobileView() &&
            <div style={styles.container}>
              <Row justify="center" align="middle" style={{ background: 'white' }}>
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

              {trackingDetails && <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trackingDetails && (
          <div className="space-y-8 relative">
            {/* Close Button */}
            <button
              onClick={clearResults}
              className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close tracking results"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-500" />
                Order Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">{trackingDetails.orderId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Waybill:</span>
                    <span className="font-semibold">{trackingDetails.shipmentTrackingDetails.waybillId}</span>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Sender Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderMobileNo || 'N/A'}</span>
                  </div>
                </div>

                {/* Receiver Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Receiver Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverMobileNo || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-500" />
                Tracking Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {trackingDetails.shipmentTrackingDetails.transportBooked && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Order Booked</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.transportBooked).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.inTransit && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">In Transit</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.inTransit).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
          

                  {trackingDetails.shipmentTrackingDetails.outForDelivery && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Out for Delivery</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.outForDelivery).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.delivered && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Delivered</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.delivered).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Box className="h-6 w-6 text-orange-500" />
                Package Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trackingDetails.shipmentProductDetails.map((pkg: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Box className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{pkg.packageId}</h4>
                            <p className="text-sm text-gray-500">{pkg.productContent || 'N/A'}</p>
                          </div>
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {pkg.productSize}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="font-medium">{pkg.productWeight} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium">{pkg.productQuantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-medium">{pkg.productValue ? `₹${pkg.productValue}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Charges</p>
                            <p className="font-medium">
                              {pkg.transportCharges && pkg.hubgoCharges 
                                ? `₹${pkg.transportCharges + pkg.hubgoCharges}`
                                : 'N/A'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>}
            </div>}



          {isMobileView() && page == 'signup' &&
            <div >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'white' }}>
                <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                  <Title level={3} style={{ textAlign: 'center' }}>Register</Title>
                  <Form  form={inquiryForm} name="signup" onFinish={onEnquiryFinish} layout="vertical">

                    <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: 'Please enter your Business name!' }]}>
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email!' }]}>
                      <Input placeholder="Enter your email" type='email' />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number!', }]}>
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

            </div>}
          {isMobileView() && page == 'login' && <div style={{ background: 'white' }}>
            <br />       <br />
            <br />



            <Login Spinner={SpinnerVal} />
            <br />
            <br />
          </div>}



          {page == 'login' && !isMobileView() &&
            <div style={{ marginLeft: '35px', marginTop: '7%' }}>


              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <div >
                  <Title
                    level={1}
                    style={{
                      color: '#1a365d',
                      fontSize: '22px',

                    }}
                  >
                    <span style={{ color: '#1a365d' }}>
                      Turn Last-Mile Delivery Problems Into
                    </span>
                    <span style={{ color: '#f97316' }}> Opportunities</span>
                  </Title>
                  <Text
                    style={{
                      color: '#4a5568',
                      fontSize: '16px',

                      display: 'block',
                    }}
                  >
                    High costs, delays, and unhappy customers are symptoms of a broken
                    system.
                    <br />
                    Let us help you build a better one.
                  </Text>


                  <img
                    src={loginImg}
                    alt="HubGo Delivery"

                  />
                </div>
                <div>  <Login Spinner={SpinnerVal} /></div>``


              </div>


            </div>
          }

          {page == 'signup' && !isMobileView() &&
            <div style={{ marginTop: '7%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>


              <div>
                <div style={{ marginLeft: '5%' }} >
                  <Title level={1} style={{ color: '#1a365d', fontSize: '22px', }}>
                    <span style={{ color: '#1a365d' }}>
                      Struggling With Last-Mile Delivery?
                    </span>
                    <span style={{ color: '#f97316' }}> We Get It!</span>
                  </Title>
                  <Text style={{ color: '#4a5568', fontSize: '16px', display: 'block', }}>
                    From delayed shipments to high costs, last-mile delivery is full of challenges.
                    <br />
                    We're here to change that!
                  </Text>
                </div>

                <div>
                  <div style={{ marginLeft: '10%' }}>
                    <img
                      src={signupImg}
                      alt="HubGo Delivery"
                      style={{ maxWidth: '100%', height: '55vh' }}
                    />
                  </div>
                </div>
              </div>


              <div >
                <div style={{ display: 'flex', justifyContent: 'center', background: 'white' }}>
                  <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', width: 300 }}>
                    <Title level={3} style={{ textAlign: 'center' }}>Register</Title>
                    <Form  form={inquiryForm}  name="signup" onFinish={onEnquiryFinish} layout="vertical">

                      <Form.Item name="businessName" label="Business Name" rules={[{ required: true, message: 'Please enter your Business name!' }]}>
                        <Input placeholder="Enter your name" />
                      </Form.Item>
                      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email!' }]}>
                        <Input placeholder="Enter your email" type='email' />
                      </Form.Item>
                      <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number!', }]}>
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

              </div>

            </div>
          }



          {page == 'homepage' ?
            <>
              <Row style={{ background: 'white' }}>

                <img
                  src={howitworks}
                  alt="HubGo Delivery"
                  style={{ height: '10%', width: '100%', padding: "0px 4%" }}
                />

              </Row>
              <Row style={{ background: 'white' }}>

                <img
                  src={whatproblem}
                  alt="HubGo Delivery"
                  style={{ height: '10%', width: '100%', padding: "0px 4%" }}

                />

              </Row>
              <Row style={{ background: 'white' }}>

                <img
                  src={whychoose}
                  alt="HubGo Delivery"
                  style={{ height: '10%', width: '100%', padding: "0px 15%" }}

                />

              </Row>
            </> : <></>}

        </Spin>
      </Layout.Content>

      <br />
      <br />
      <Footerr />
    </Layout>
  )
}


