import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { Package, Truck, MapPin, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <Row gutter={[24, 24]} className="mt-12">
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic 
            title="Active Deliveries"
            value={42}
            prefix={<Package className="text-blue-500" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Partner Terminals"
            value={15}
            prefix={<Truck className="text-green-500" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Coverage Area"
            value="25 km"
            prefix={<MapPin className="text-purple-500" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Avg Delivery Time"
            value="4 hrs"
            prefix={<Clock className="text-orange-500" />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsSection;