import { Button, Card, Form, Input, Radio, Table } from 'antd';
import { useEffect, useState } from 'react';

const BookingForm = () => {
  const [form] = Form.useForm();
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

  const onFinish = (values:any) => {
    // const newData = {
    //   key: idCounter,
    //   id: idCounter,
    //   name: values.name,
    //   label: values.label,
    //   address: `${values.address}, ${values.pincode}`,
    // };
     console.log(values);
    // setTableData([...tableData, newData]);
    // setIdCounter(idCounter + 1);
    form.resetFields(); // Reset form after submission
  };

  const columns = [
    { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
    { title: 'Shipped Date', dataIndex: 'shippedDate', key: 'shippedDate' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
];

  return (
    <div style={{ display:'flex'}}>
    <div style={{width:"70%",  }}>
        <Card>
     
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{  padding: '20px', borderRadius: '8px' }}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <Form.Item
            label="Pin Code"
            name="pincode"
            rules={[{ required: true, message: 'Please enter the pin code!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address!' }]}
          >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter the phone number!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Cash"
            name="cash"
            rules={[{ required: true, message: 'Please select cash option!' }]}
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Cash Collect"
            name="cashCollect"
            rules={[
              { required: true, message: 'Please enter cash collect amount!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Form.Item
            label="Package Type"
            name="packageType"
            rules={[
              { required: true, message: 'Please select a package type!' },
            ]}
          >
            <Radio.Group>
              <Radio value="Type 1">Type 1</Radio>
              <Radio value="Type 2">Type 2</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Package Details"
            name="packageDetails"
            rules={[
              { required: true, message: 'Please enter package details!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: 'Please enter a label!' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: 'Please enter the weight!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please enter the size!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Card>
      </div>
      
        <div style={{width:"30%", height:"700px", }}>
      <Card>
      <Input 
                placeholder="Search by Tracking ID"
                // value={searchText}
                // onChange={(e) => setSearchText(e.target.value)}
                style={{ width:'100%'}}
               
            />
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
      </div>
    </div>
  );
};

export default BookingForm;
