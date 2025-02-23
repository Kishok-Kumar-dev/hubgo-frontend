import React from 'react';
import { Layout, Row, Col, Button, Typography, Space } from 'antd';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Icon from '../components/asserts/icon.png';
const { Footer: AntFooter } = Layout;
const { Text, Link, Title } = Typography;

const Footerr = () => {
  return (
    <AntFooter style={{ padding: 0, width: '100%', background: '#1a2f5a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
          {/* Logo and Tagline Section */}
          <Col xs={24} sm={12} lg={8}>
            <Space direction="vertical" size={16}>
              <img src={Icon} alt="HubGo" style={{ height: 32, width: 'auto', backgroundColor:'white', padding:'5px' }} />
              <Text style={{ color: 'white', maxWidth: 300, display: 'block' }}>
                Delivering the Last Mile Shouldn't Be the Hardest Part
              </Text>
              <Button type="default" style={{ background: 'white', borderRadius: 4 }}>
                Watch Demo
              </Button>
            </Space>
          </Col>

          {/* Contact Section */}
          <Col xs={24} sm={12} lg={8}>
            <Title level={4} style={{ color: 'white', marginBottom: 16 }}>Contact Us</Title>
            <Space direction="vertical" size={16}>
              <Space align="start">
                <MapPin size={18} color="white" />
                <Text style={{ color: 'white' }}>Chennai , Tamil Nadu.</Text>
              </Space>
              <Space align="start">
  <Phone size={18} color="white" onClick={() => window.open(`tel:+919148741522`, '_self')} />
  <Text style={{ color: 'white', cursor: 'pointer' }} onClick={() => window.open('mailto:support@hubgo.in', '_blank')}>+91 81487 41522</Text>
</Space>

<Space align="start">
  <Mail size={18} color="white" onClick={() => window.open(`mailto:support@hubgo.in?subject=Support Inquiry`, '_blank')} />
  <Text style={{ color: 'white', wordBreak: 'break-all', cursor: 'pointer' }} onClick={() => window.open('mailto:support@hubgo.in', '_blank')}>support@hubgo.in</Text>
</Space>
            </Space>
          </Col>

          {/* Stay Connected Section */}
          <Col xs={24} sm={12} lg={8}>
            <Title level={4} style={{ color: 'white', marginBottom: 16 }}>Stay Connected</Title>
            <Space size={24}>
              <Link href="#" style={{ color: 'white', fontSize: '24px', fontWeight: 600 }}>in</Link>
              <Link href="#" style={{ color: 'white' }}><Facebook size={24} /></Link>
              <Link href="#" style={{ color: 'white' }}><Instagram size={24} /></Link>
              <Link href="#" style={{ color: 'white' }}><Twitter size={24} /></Link>
            </Space>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: 16 }}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xs={24} sm={12}>
              <Text style={{ color: 'white', textAlign: 'center', display: 'block' }}>
                © 2025 HubGo.in. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} sm={12}>
              <Space split={<Text style={{ color: 'white' }}>|</Text>} style={{ 
                display: 'flex', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 16 
              }}>
                <Link href="#" style={{ color: 'white', whiteSpace: 'nowrap' }}>Terms & Conditions</Link>
                <Link href="#" style={{ color: 'white', whiteSpace: 'nowrap' }}>Privacy policy</Link>
                <Link href="#" style={{ color: 'white', whiteSpace: 'nowrap' }}>Cookies</Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footerr;