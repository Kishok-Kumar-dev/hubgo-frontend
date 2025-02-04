import React, { useState } from 'react';
import {
  Input,
  Button,
  Card,
  Table,
  DatePicker,
  Space,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface ShipmentData {
  key: string;
  sNo: number;
  waybillNo: string;
  name: string;
  address: string;
  edd: string;
  status: 'Delivered' | 'In Transit' | 'Booked' | 'Out for Delivery';
}

const TrackParcel: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentData | null>(
    null
  );

  const columns: ColumnsType<ShipmentData> = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      key: 'sNo',
      width: 70,
    },
    {
      title: 'Waybill No',
      dataIndex: 'waybillNo',
      key: 'waybillNo',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'EDD',
      dataIndex: 'edd',
      key: 'edd',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        switch (status) {
          case 'Delivered':
            color = 'success';
            break;
          case 'In Transit':
            color = 'processing';
            break;
          case 'Booked':
            color = 'warning';
            break;
          case 'Out for Delivery':
            color = 'blue';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Edit',
      key: 'action',
      render: (_, record) => (
        <Button type="text" onClick={() => setSelectedShipment(record)}>
          •••
        </Button>
      ),
    },
  ];

  const data: ShipmentData[] = [
    {
      key: '1',
      sNo: 1,
      waybillNo: 'Hubgo1111',
      name: 'Karthick',
      address: '1/302, Padasalai st, Mugalivakkam, Chennai-125.',
      edd: 'Jan 04, 2025',
      status: 'Delivered',
    },
    {
      key: '2',
      sNo: 2,
      waybillNo: 'Hubgo1112',
      name: 'Rohith',
      address: '1/302, Padasalai st, Mugalivakkam, Chennai-125.',
      edd: 'Jan 04, 2025',
      status: 'In Transit',
    },
    // Add more sample data as needed
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={4}>Tracking List</Title>
        <Text type="secondary">
          You can Track all you Recent and old bookings here!
        </Text>
      </div>

      <Space className="w-full mb-6" size="middle">
        <Input
          placeholder="Search with Tracking Id or waybill No"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <RangePicker
          placeholder={['Jan 01,2025', 'Jan 02,2025']}
          style={{ width: 300 }}
        />
      </Space>

      <Card title="Shipping List">
        <Table<ShipmentData>
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>

      {selectedShipment && (
        <Card title="Package Details" className="mt-6">
          <Timeline
            items={[
              {
                color: 'green',
                children: (
                  <>
                    <Text strong>Booked</Text>
                    <br />
                    <Text type="secondary">Booked by devi transport</Text>
                    <br />
                    <Text type="secondary">@Jan 04,2025 (11:11 am)</Text>
                  </>
                ),
              },
              {
                color: 'blue',
                children: (
                  <>
                    <Text strong>Reached transporter hub</Text>
                    <br />
                    <Text type="secondary">@Jan 05,2025 (11:11 am)</Text>
                  </>
                ),
              },
              {
                color: 'blue',
                children: (
                  <>
                    <Text strong>Collected by hubgo</Text>
                    <br />
                    <Text type="secondary">@Jan 05,2025 (11:11 am)</Text>
                  </>
                ),
              },
              {
                color: 'blue',
                children: (
                  <>
                    <Text strong>Reached Nearest hub</Text>
                    <br />
                    <Text type="secondary">@Jan 05,2025 (11:11 am)</Text>
                  </>
                ),
              },
              {
                color: 'blue',
                children: (
                  <>
                    <Text strong>Out For Delivery</Text>
                    <br />
                    <Text type="secondary">@Jan 05,2025 (11:11 am)</Text>
                  </>
                ),
              },
              {
                color: 'gray',
                children: (
                  <>
                    <Text strong>Delivered</Text>
                    <br />
                    <Text type="secondary">@Jan 05,2025 (11:11 am)</Text>
                  </>
                ),
              },
            ]}
          />

          <div className="mt-6">
            <Title level={5}>Package Details</Title>
            <ul className="list-disc pl-6">
              <li>Envelope / Pouch - Medium - Documents - 2</li>
              <li>Carton Box - Medium - Books - 2</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TrackParcel;