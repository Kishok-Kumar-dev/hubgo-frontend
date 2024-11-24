import { Button, Col, Input, Layout, Row, Steps, Table, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

const TrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stepsCurrent, setStepsCurrent] = useState(0);
  // const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

  const handleSearch = () => {
    // Simulate API call
    setTimeout(() => {
      // setProgress(50);
      setStepsCurrent(1);
    }, 500);
  };

  // const handleNextStep = () => {
  //   setStepsCurrent((prev) => Math.min(prev + 1, 4));
  // };

  // const handlePrevStep = () => {
  //   setStepsCurrent((prev) => Math.max(prev - 1, 0));
  // };

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
})
  return (
    <div  style={{ background:"white" }} >
    

        <Row>

<Col span={4}></Col>
<Col span={12} >
          <Input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter tracking number"
   
          />
          </Col>
          <Col >
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          </Col>
          </Row>


      {searchTerm && 
        <Content style={{ padding: '24px', overflow: 'auto', flex:"auto",  }}>
          <Row>
            <Col span={3}></Col>
          <Col span={5}>
          <Steps current={stepsCurrent} style={{ marginBottom: '20px' }} 
          direction='vertical'
          items={[
            {
              title: 'Package received',
              description:"Transported Recived your  Booking",
            },
            {
              title: 'Processing',
              description:"Parcel InTransit ",
            },
            {
              title: 'Shipped',
              description:"Parcel Shipped ",
            },
            {
              title: 'Out for Delivery ',
              description:"Out for Delivery  ",
            },           {
              title: 'Delivered ',
              description:"Delivered  ",
            },
          ]}
          >
           
          </Steps>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
{/* 
          <Statistic
            title="Tracking Status"
            value={`${progress}%`}
            precision={0}
            suffix="%"
            style={{ marginBottom: '20px' }}
          />

          <Progress percent={progress} showInfo={false} /> */}

          {/* <div style={{ marginTop: '40px' }}>
            <Text strong>Tracking Details:</Text>
            <ul>
              <li>Tracking Number: #1234567890</li>
              <li>Shipper Name: John Doe</li>
              <li>Destination: New York, USA</li>
              <li>Estimated Delivery Date: 12/15/2023</li>
            </ul>
          </div> */}

          <div style={{ }}>
            <Title level={4}>Tracking History:</Title>
            <Table columns={[
        { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
        { title: 'Deliver', dataIndex: 'deliver', key: 'deliver' },
        { title: 'Shipped Date', dataIndex: 'shippedDate', key: 'shippedDate' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'Weight', dataIndex: 'weight', key: 'weight' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ]} dataSource={data} pagination={false} />

            {/* <Button.Group style={{ marginTop: '20px' }}>
              <Button onClick={handlePrevStep}>Previous Step</Button>
              <Button onClick={handleNextStep}>Next Step</Button>
            </Button.Group> */}
          </div>
          </Col>
          </Row>
        </Content>
      }
    </div>
  );
};

export default TrackingPage;