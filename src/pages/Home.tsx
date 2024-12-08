import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import StatsSection from '../components/home/StatsSection';
import InfoCards from '../components/home/InfoCards';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Title level={1}>
          <span className="text-[#1e3a8a]">HUB</span>
          <span className="text-[#f97316]">GO</span>
          <span className="block text-2xl font-normal mt-2">Your Intra-City Delivery Expert</span>
        </Title>
        <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
          We bridge the gap between bus terminals and your doorstep. Get your parcels delivered right to your home from any bus terminal across the city.
        </Paragraph>
        <Button type="primary" size="large" onClick={() => navigate('/book')}>
          Book a Delivery
        </Button>
      </div>

      <StatsSection />
      <InfoCards />
    </div>
  );
};

export default Home;