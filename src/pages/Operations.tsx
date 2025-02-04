import React, { useState, useEffect } from 'react';
import {
  Layout,
  Tabs,
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  notification,
  Checkbox,
} from 'antd';
import { Package, Truck, Box, Calendar } from 'lucide-react';

const { Content } = Layout;
const { TabPane } = Tabs;

// Define status constants
const STATUS = {
  BOOKED: 'BOOKED',
  INTRANSIT: 'INTRANSIT',
  TRANSPORT_HUB_REACHED: 'TRANSPORT_HUB_REACHED',
  TRANSPORT_HUB_PICKED: 'TRANSPORT_HUB_PICKED',
  OUT_OF_DELIVERY: 'OUT_OF_DELIVERY',
  DELIVERED: 'DELIVERED',
};

// Mock drivers data
const mockDrivers = [
  { id: 1, name: 'Driver 1', type: 'pickup' },
  { id: 2, name: 'Driver 2', type: 'pickup' },
  { id: 3, name: 'Driver 3', type: 'delivery' },
  { id: 4, name: 'Driver 4', type: 'delivery' },
];

// Mock data
const mockParcels = [
  {
    id: 1,
    shipmentTrackingDetails: {
      waybillId: 'WB001',
      receiverName: 'John Doe',
      address: '123 Main St, Chennai',
      orderStatus: STATUS.BOOKED,
      pickupDriver: null,
      deliveryDriver: null,
    },
  },
  {
    id: 2,
    shipmentTrackingDetails: {
      waybillId: 'WB002',
      receiverName: 'Jane Smith',
      address: '456 Park Ave, Chennai',
      orderStatus: STATUS.INTRANSIT,
      pickupDriver: null,
      deliveryDriver: null,
    },
  },
  {
    id: 3,
    shipmentTrackingDetails: {
      waybillId: 'WB003',
      receiverName: 'Bob Johnson',
      address: '789 Oak Rd, Chennai',
      orderStatus: STATUS.TRANSPORT_HUB_REACHED,
      pickupDriver: null,
      deliveryDriver: null,
    },
  },
  {
    id: 4,
    shipmentTrackingDetails: {
      waybillId: 'WB004',
      receiverName: 'Alice Brown',
      address: '321 Pine St, Chennai',
      orderStatus: STATUS.TRANSPORT_HUB_PICKED,
      pickupDriver: 'Driver 1',
      deliveryDriver: null,
    },
  },
  {
    id: 5,
    shipmentTrackingDetails: {
      waybillId: 'WB005',
      receiverName: 'Charlie Wilson',
      address: '654 Elm St, Chennai',
      orderStatus: STATUS.DELIVERED,
      pickupDriver: 'Driver 2',
      deliveryDriver: 'Driver 3',
    },
  },
];

const Operations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [parcels, setParcels] = useState(mockParcels);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isAssignDriverModalVisible, setIsAssignDriverModalVisible] =
    useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [userRole, setUserRole] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isBulkUpdateModalVisible, setIsBulkUpdateModalVisible] =
    useState(false);
  const [driverAssignmentType, setDriverAssignmentType] = useState<
    'pickup' | 'delivery'
  >('pickup');
  const [counts, setCounts] = useState({
    total: 0,
    booked: 0,
    inTransit: 0,
    delivered: 0,
  });
  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [driverForm] = Form.useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.roles || 'ADMIN');
    calculateCounts();
  }, [parcels]);

  const calculateCounts = () => {
    const newCounts = parcels.reduce(
      (acc, parcel) => {
        acc.total++;
        switch (parcel.shipmentTrackingDetails?.orderStatus) {
          case STATUS.BOOKED:
            acc.booked++;
            break;
          case STATUS.DELIVERED:
            acc.delivered++;
            break;
          case STATUS.INTRANSIT:
          case STATUS.TRANSPORT_HUB_REACHED:
          case STATUS.TRANSPORT_HUB_PICKED:
          case STATUS.OUT_OF_DELIVERY:
            acc.inTransit++;
            break;
        }
        return acc;
      },
      { total: 0, booked: 0, inTransit: 0, delivered: 0 }
    );

    setCounts(newCounts);
  };

  const getAvailableStatuses = () => {
    switch (userRole) {
      case 'TRANSPORT':
        return [STATUS.INTRANSIT, STATUS.TRANSPORT_HUB_REACHED];
      case 'DRIVER':
        return [
          STATUS.TRANSPORT_HUB_PICKED,
          STATUS.TRANSPORT_HUB_REACHED,
          STATUS.OUT_OF_DELIVERY,
          STATUS.DELIVERED,
        ];
      case 'OPERATIONS':
      case 'ADMIN':
        return Object.values(STATUS);
      default:
        return [];
    }
  };

  const handleStatusUpdate = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsStatusModalVisible(true);
  };

  const handleAssignDriver = (type: 'pickup' | 'delivery') => {
    setDriverAssignmentType(type);
    setIsAssignDriverModalVisible(true);
  };

  const handleDriverAssignment = (values: any) => {
    const updatedParcels = parcels.map((parcel) => {
      if (selectedRows.includes(parcel.id)) {
        return {
          ...parcel,
          shipmentTrackingDetails: {
            ...parcel.shipmentTrackingDetails,
            [driverAssignmentType === 'pickup'
              ? 'pickupDriver'
              : 'deliveryDriver']: values.driver,
          },
        };
      }
      return parcel;
    });

    setParcels(updatedParcels);
    notification.success({
      message: `Driver assigned to ${selectedRows.length} orders`,
    });
    setIsAssignDriverModalVisible(false);
    setSelectedRows([]);
    driverForm.resetFields();
  };

  const handleStatusSubmit = (values: any) => {
    const updatedParcels = parcels.map((parcel) => {
      if (parcel.id === selectedParcel.id) {
        return {
          ...parcel,
          shipmentTrackingDetails: {
            ...parcel.shipmentTrackingDetails,
            orderStatus: values.status,
          },
        };
      }
      return parcel;
    });

    setParcels(updatedParcels);
    notification.success({ message: 'Status updated successfully' });
    setIsStatusModalVisible(false);
    form.resetFields();
  };

  const handleBulkStatusUpdate = (values: any) => {
    const updatedParcels = parcels.map((parcel) => {
      if (selectedRows.includes(parcel.id)) {
        return {
          ...parcel,
          shipmentTrackingDetails: {
            ...parcel.shipmentTrackingDetails,
            orderStatus: values.status,
          },
        };
      }
      return parcel;
    });

    setParcels(updatedParcels);
    notification.success({
      message: `Status updated for ${selectedRows.length} parcels`,
    });
    setIsBulkUpdateModalVisible(false);
    setSelectedRows([]);
    bulkForm.resetFields();
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'Waybill ID',
      dataIndex: ['shipmentTrackingDetails', 'waybillId'],
      key: 'waybillId',
    },
    {
      title: 'Receiver Name',
      dataIndex: ['shipmentTrackingDetails', 'receiverName'],
      key: 'receiverName',
    },
    {
      title: 'Address',
      dataIndex: ['shipmentTrackingDetails', 'address'],
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: ['shipmentTrackingDetails', 'orderStatus'],
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === STATUS.DELIVERED
              ? 'success'
              : status === STATUS.INTRANSIT
              ? 'processing'
              : status === STATUS.BOOKED
              ? 'warning'
              : 'default'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Pickup Driver',
      dataIndex: ['shipmentTrackingDetails', 'pickupDriver'],
      key: 'pickupDriver',
    },
    {
      title: 'Delivery Driver',
      dataIndex: ['shipmentTrackingDetails', 'deliveryDriver'],
      key: 'deliveryDriver',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Button
          type="primary"
          onClick={() => handleStatusUpdate(record)}
          disabled={!getAvailableStatuses().length}
        >
          Update Status
        </Button>
      ),
    },
  ];

  const getTableData = () => {
    if (userRole === 'DRIVER') {
      const pickupOrders = parcels.filter(
        (p) =>
          p.shipmentTrackingDetails?.orderStatus ===
            STATUS.TRANSPORT_HUB_REACHED ||
          p.shipmentTrackingDetails?.orderStatus === STATUS.TRANSPORT_HUB_PICKED
      );
      const deliveryOrders = parcels.filter(
        (p) => p.shipmentTrackingDetails?.orderStatus === STATUS.OUT_OF_DELIVERY
      );
      return { pickupOrders, deliveryOrders };
    }
    return {
      allOrders: parcels,
      pickupAssignment: parcels.filter(
        (p) =>
          p.shipmentTrackingDetails?.orderStatus ===
          STATUS.TRANSPORT_HUB_REACHED
      ),
      deliveryAssignment: parcels.filter(
        (p) =>
          p.shipmentTrackingDetails?.orderStatus === STATUS.TRANSPORT_HUB_PICKED
      ),
    };
  };

  const renderAdminTabs = () => {
    const { allOrders, pickupAssignment, deliveryAssignment } = getTableData();

    return (
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="All Orders" key="1">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={allOrders}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Pickup Assignment" key="2">
          {selectedRows.length > 0 && (
            <Button
              type="primary"
              onClick={() => handleAssignDriver('pickup')}
              style={{ marginBottom: 16 }}
            >
              Assign Pickup Driver
            </Button>
          )}
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={pickupAssignment}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Delivery Assignment" key="3">
          {selectedRows.length > 0 && (
            <Button
              type="primary"
              onClick={() => handleAssignDriver('delivery')}
              style={{ marginBottom: 16 }}
            >
              Assign Delivery Driver
            </Button>
          )}
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={deliveryAssignment}
            rowKey="id"
          />
        </TabPane>
      </Tabs>
    );
  };

  return (
    <Content className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Operations Management</h1>

        {/* Count Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card style={{ background: '#1677ff' }}>
              <div style={{ color: '#fff' }}>TOTAL ORDERS</div>
              <div style={{ fontSize: '48px', color: '#fff' }}>
                {counts.total}
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div>BOOKED</div>
              <div style={{ fontSize: '48px' }}>{counts.booked}</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div>IN TRANSIT</div>
              <div style={{ fontSize: '48px' }}>{counts.inTransit}</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div>DELIVERED</div>
              <div style={{ fontSize: '48px' }}>{counts.delivered}</div>
            </Card>
          </Col>
        </Row>

        {/* Bulk Update Button */}
        {selectedRows.length > 0 && activeTab === '1' && (
          <div className="mb-4">
            <Button
              type="primary"
              onClick={() => setIsBulkUpdateModalVisible(true)}
            >
              Update Status for {selectedRows.length} Selected Orders
            </Button>
          </div>
        )}

        {userRole === 'DRIVER' ? (
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Pickup Orders" key="1">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={getTableData().pickupOrders}
                rowKey="id"
              />
            </TabPane>
            <TabPane tab="Delivery Orders" key="2">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={getTableData().deliveryOrders}
                rowKey="id"
              />
            </TabPane>
          </Tabs>
        ) : (
          renderAdminTabs()
        )}

        {/* Single Status Update Modal */}
        <Modal
          title="Update Status"
          open={isStatusModalVisible}
          onCancel={() => setIsStatusModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleStatusSubmit} layout="vertical">
            <Form.Item
              name="status"
              label="Select Status"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select placeholder="Select new status">
                {getAvailableStatuses().map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Update Status
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Bulk Status Update Modal */}
        <Modal
          title="Bulk Update Status"
          open={isBulkUpdateModalVisible}
          onCancel={() => {
            setIsBulkUpdateModalVisible(false);
            setSelectedRows([]);
          }}
          footer={null}
        >
          <Form
            form={bulkForm}
            onFinish={handleBulkStatusUpdate}
            layout="vertical"
          >
            <Form.Item
              name="status"
              label="Select Status"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select placeholder="Select new status">
                {getAvailableStatuses().map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Update Status for {selectedRows.length} Orders
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Driver Assignment Modal */}
        <Modal
          title={`Assign ${
            driverAssignmentType === 'pickup' ? 'Pickup' : 'Delivery'
          } Driver`}
          open={isAssignDriverModalVisible}
          onCancel={() => {
            setIsAssignDriverModalVisible(false);
            setSelectedRows([]);
          }}
          footer={null}
        >
          <Form
            form={driverForm}
            onFinish={handleDriverAssignment}
            layout="vertical"
          >
            <Form.Item
              name="driver"
              label="Select Driver"
              rules={[{ required: true, message: 'Please select a driver' }]}
            >
              <Select placeholder="Select driver">
                {mockDrivers
                  .filter((driver) => driver.type === driverAssignmentType)
                  .map((driver) => (
                    <Select.Option key={driver.id} value={driver.name}>
                      {driver.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Assign Driver to {selectedRows.length} Orders
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default Operations;
