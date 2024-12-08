import React from 'react';
import { Form, Input, InputNumber, Select, Radio, Button, Card, message } from 'antd';
import { Package } from 'lucide-react';
import type { ParcelDetails, ContactDetails } from '../types/parcel';

const { Option } = Select;

const BookParcel: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    message.success('Booking created successfully!');
    console.log('Form values:', values);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card title={
        <div className="flex items-center gap-2">
          <Package className="text-blue-600" />
          <span>Book a Parcel</span>
        </div>
      }>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Parcel Details</h3>
              <Form.Item name={['parcel', 'productName']} label="Product Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              
              <Form.Item name={['parcel', 'productWeight']} label="Weight (kg)" rules={[{ required: true }]}>
                <InputNumber min={0.1} step={0.1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name={['parcel', 'productType']} label="Product Type" rules={[{ required: true }]}>
                <Select>
                  <Option value="electronics">Electronics</Option>
                  <Option value="clothing">Clothing</Option>
                  <Option value="documents">Documents</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name={['parcel', 'productSize']} label="Size" rules={[{ required: true }]}>
                <Select>
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Contact Details</h3>
              <Form.Item name={['contact', 'receiverName']} label="Receiver Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={['contact', 'receiverMobile']} label="Receiver Mobile" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={['contact', 'senderMobile']} label="Sender Mobile" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={['contact', 'deliveryAddress']} label="Delivery Address" rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
              </Form.Item>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Transport Details</h3>
              <Form.Item name="waybillNo" label="Waybill Number" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="prepaid">Prepaid</Radio>
                  <Radio value="cod">Cash on Delivery</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit" size="large" block>
              Book Parcel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookParcel;