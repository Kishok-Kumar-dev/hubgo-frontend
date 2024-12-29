import React from 'react';
import { Form, Input, InputNumber, Select, Radio, Button, Card, message, Row, Col, Divider, Space, Tabs, Table } from 'antd';
import { Package } from 'lucide-react';
import type { ParcelDetails, ContactDetails } from '../types/parcel';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './BookParcel.css';
const { Option } = Select;
const { Tab } = Tabs;

const BookParcel: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    message.success('Booking created successfully!');
    console.log('Form values:', values);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => `${weight} kg`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      key: 'price',
      render: () => '₹100',
    },
  ];

  const productcolumns = [
    {
      title: 'Product',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => `${weight} kg`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    }
  ];


  return (
    <>
      <>Parcel Details</>
      <br /><br />
      <Form
        form={form}
        className='book-parcel-form'
        onFinish={onFinish}
        style={{ fontSize: '10px' }}
      >
        <Row>
          <Col span={1} />
          <Col span={6}>
            <Form.Item name="waybillno" label="WaybillNo" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={6}>
            <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <Form.Item name= 'senderName' label="Sender Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item></Col>


        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={6}>
            <Form.Item name= 'receiverName' label="Receiver Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item></Col>

          <Col span={1}></Col>
          <Col span={6}>

            <Form.Item name= 'receiverMobile' label="Receiver Mobile" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <Form.Item name='senderMobile' label="Sender Mobile" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={6}>
            <Form.Item name= 'deliveryAddress' label="Address" rules={[{ required: true }]}>
              <Input.TextArea rows={1} style={{ fontSize: 'small' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={7}>
            <Form.Item name="productType" label="Product Type"
              rules={[{ required: true, message: "Please Enter Parcel Code !" }]}>
              <Select>
                <Option value="parcel">Parcel</Option>
                <Option value="envelope">Envelope</Option>
                <Option value="box">Box</Option>
                <Option value="luccage">Luccage</Option>
                <Option value="others">Others</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="content"
              label="Product Name"
              rules={[{ required: true, message: "" }]}>
              <Input placeholder="Enter the Proc" />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              name="display"
              label="Size"
              rules={[{ required: true, message: "Please Enter Display !" }]}
            >
              <Select>
                <Option value="1">Small</Option>
                <Option value="2">Medium</Option>
                <Option value="3">Large</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>


        </Row>

        <br />
        <br />
        <br />
        {/* <Row>
          <Col span={1}></Col>
          <Col span={17}>
            <Radio.Group>
              <Radio value={1}>Cash On Delivery</Radio>
              <Radio value={2}>Prepaid</Radio>
            </Radio.Group>
          </Col >
          <Col>




            <Form.Item>
              <Button type="primary" htmlType="submit">
                Book Parcel
              </Button>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col>
            <Button>
              Clear
            </Button>
          </Col>
        </Row> */}


        <Table
          dataSource={[{ id: 1, productType: 'Parcel', size: 'small', weight: 1, quantity: 1 }]}
          columns={productcolumns}
          pagination={false}
          rowKey="id"
        />

        {/* <Table
        dataSource={[{ id: 1, productType: 'Parcel', size: 'small', weight: 1, quantity: 1 }]}
        columns={columns}
        pagination={false}
        rowKey="id"
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                Total Price:
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} className="font-bold">
                ₹{100}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      /> */}
      </Form>

    </>
  );
};

export default BookParcel;