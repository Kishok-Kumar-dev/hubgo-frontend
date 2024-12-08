import React from 'react';
import { Row, Col, Card } from 'antd';

const InfoCards: React.FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Card 
          title="How It Works" 
          className="h-full"
          styles={{ header: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' } }}
        >
          <ol className="space-y-4">
            <li>1. Book your parcel delivery through our platform</li>
            <li>2. We collect from the bus terminal</li>
            <li>3. Sort at our central hub</li>
            <li>4. Deliver to your doorstep</li>
          </ol>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card 
          title="Our Services" 
          className="h-full"
          styles={{ header: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' } }}
        >
          <ul className="space-y-4">
            <li>✓ Last mile delivery</li>
            <li>✓ Real-time tracking</li>
            <li>✓ Secure handling</li>
            <li>✓ Multiple payment options</li>
          </ul>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card 
          title="Coverage Areas" 
          className="h-full"
          styles={{ header: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' } }}
        >
          <ul className="space-y-4">
            <li>• Central Business District</li>
            <li>• Northern Suburbs</li>
            <li>• Eastern Region</li>
            <li>• Western Zone</li>
          </ul>
        </Card>
      </Col>
    </Row>
  );
};

export default InfoCards;