import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Card, Table, Tag, Button, Modal, Form, Select, Input, Row, Col, notification, Checkbox,DatePicker ,Space, Spin } from 'antd';
import { Package, Truck, Box, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { getData, postData , putData} from '../service/AppService';

const { Content } = Layout;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;


const STATUS = {
  BOOKED: 'BOOKED',
  INTRANSIT: 'INTRANSIT',
  TRANSPORT_HUB_REACHED: 'TRANSPORT_HUB_REACHED',
  TRANSPORT_HUB_PICKED: 'TRANSPORT_HUB_PICKED',
  NEAREST_HUB_REACHED:'NEAREST_HUB_REACHED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  ATTEMPTED:'ATTEMPTED'
};






const Operations: React.FC = () => {
  const [dateRangePickerForm] = Form.useForm();
  const [userId, setUserId]=useState<any>();
  const [role, setRole]= useState<any>();
  const [roleCode, setRoleCode]= useState<any>();
  const [data, setData] = useState<any>([]);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState('1');
  const [parcels, setParcels] = useState<any>([]);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isAssignDriverModalVisible, setIsAssignDriverModalVisible] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [userRole, setUserRole] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isBulkUpdateModalVisible, setIsBulkUpdateModalVisible] = useState(false);
  const [driverAssignmentType, setDriverAssignmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [loading, setLoading] = useState<boolean>(false);
  const [counts, setCounts] = useState({
    total: 0,
    booked: 0,
    inTransit: 0,
    transportHubReached:0,
    transportHubpicked:0,
    nearestHubReached:0,
    outforDelivery:0,
    delivered: 0,
    attempted: 0
  });
  const [mockDrivers, setMockDrivers]= useState<any>([]);

  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [driverForm] = Form.useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.roles || 'ADMIN');
    calculateCounts();
  }, [parcels]);


  const calculateCounts = () => {
    const newCounts = parcels.reduce((acc, parcel) => {
      acc.total++;
      switch (parcel?.shipmentTrackingDetails?.orderStatus) {
        case STATUS.BOOKED:
          acc.booked++;
          break;
        case STATUS.INTRANSIT:
          acc.inTransit++;
          break;
        case STATUS.TRANSPORT_HUB_REACHED:
          acc.transportHubReached++;
          break;
        case STATUS.TRANSPORT_HUB_PICKED:
          acc.transportHubpicked++;
          break;
        case STATUS.NEAREST_HUB_REACHED:
          acc.nearestHubReached++;
          break;
        case STATUS.OUT_FOR_DELIVERY:
          acc.outforDelivery++;
          break;
        case STATUS.DELIVERED:
          acc.delivered++;
          break;
        case STATUS.ATTEMPTED:
          acc.delivered++;
          break;
      }
      return acc;
    }, { total: 0, booked: 0, inTransit: 0, transportHubReached: 0, transportHubpicked: 0, nearestHubReached: 0, outforDelivery: 0, delivered: 0, attempted: 0 });

    setCounts(newCounts);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case STATUS.DELIVERED:
        return { color: '#52c41a', background: '#f6ffed', border: '#b7eb8f' };
      case STATUS.INTRANSIT:
      case STATUS.TRANSPORT_HUB_REACHED:
      case STATUS.NEAREST_HUB_REACHED:
      case STATUS.TRANSPORT_HUB_PICKED:
        return { color: '#1890ff', background: '#e6f7ff', border: '#91d5ff' };
      case STATUS.BOOKED:
        return { color: '#faad14', background: '#fffbe6', border: '#ffe58f' };
      case STATUS.OUT_FOR_DELIVERY:
        return { color: '#722ed1', background: '#f9f0ff', border: '#d3adf7' };
      default:
        return { color: '#8c8c8c', background: '#fafafa', border: '#d9d9d9' };
    }
  };

  const getAvailableStatuses = () => {
    switch (userRole) {
      case 'TRANSPORT':
        return [STATUS.INTRANSIT, STATUS.TRANSPORT_HUB_REACHED];
      case 'DRIVER':
      case 'BIKE_CAPTAIN':
        return [STATUS.TRANSPORT_HUB_PICKED, STATUS.TRANSPORT_HUB_REACHED,STATUS.NEAREST_HUB_REACHED,STATUS.OUT_FOR_DELIVERY, STATUS.DELIVERED];
      case 'OPERATIONS':
      case 'ADMIN':
        return Object.values(STATUS);
      default:
        return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    getData('/api/users/role/DRIVER').then((drivers)=>{
    setMockDrivers(drivers);
    const res = localStorage.getItem('user');
    let roleStr=null;
    let userJson = JSON.parse(res || '{}');
    let roleValue= userJson && userJson.roles;
    if ( roleValue=== 'ADMIN') {
      setRole('ADMIN');
      roleStr='AD';
    }else if(roleValue === 'TRANSPORT'|| roleValue=='BOOKING_AGENT' || roleValue=='TRANSPORT_HUB'){
      setRole('TRANSPORT');
      roleStr='TA';
      if(roleValue=='BOOKING_AGENT' || roleValue=='TRANSPORT_HUB'){
          userJson.userid=userJson.transportId;
      }
    }else if(roleValue === 'DRIVER'){
      setRole('DRIVER');
      roleStr='PA';
    }else if(roleValue=='BIKE_CAPTAIN'){
      setRole('BIKE_CAPTAIN');
      roleStr='PA';
    }
    setUserId(userJson.userid);
    setRoleCode(roleStr);
    const today = dayjs();
    const lastMonthStart = today.startOf('month');
    const lastMonthEnd = today.endOf('month');
    dateRangePickerForm.setFieldsValue({
      dateRange: [lastMonthStart, lastMonthEnd],
    });
    let str= lastMonthStart.format('YYYY-MM-DD');
    let end= lastMonthEnd.format('YYYY-MM-DD');
    setStartDate(str);setEndDate(end);
    useLoaderData(str, end,userJson.userid, roleStr, drivers);
  }).catch((err)=>{
    notification.error({'message':"Error Fetching Driver"})
   }).finally(()=>{
    //  setLoading(false);
    })

  }, []);
  const useLoaderData=(str:any, end:any, userid?:any, role?:any, driverss?:any)=>{
    if(!userid){
      userid= userId;
    }
    if(!role){
      role=roleCode;
    }
    setLoading(true);
    getData(`/api/booking/transport-details-by-date-filter?fromDate=${str}&toDate=${end}&userId=${userid}&userRole=${role}`).then((res:any)=>{
      console.log(res);
      let driverMap;
      if(driverss?.length>0){
        driverMap= new Map(driverss.map((driver:any) => [driver.userLanId, driver.fullName]));

      }else{
        driverMap = new Map(mockDrivers.map((driver:any) => [driver.userLanId, driver.fullName]));

      }

      let orders= res.map((parcel:any) => {
        const { pickupAgentId, deliveryAgentId } = parcel.shipmentTrackingDetails;
    
        return {
          ...parcel,
          pickupDriver: pickupAgentId?driverMap.get(pickupAgentId): 'Not Assigned',
          deliveryDriver: deliveryAgentId?driverMap.get(deliveryAgentId): 'Not Assigned'
        };
      });
      setParcels(orders);
    }).finally(() => {
      setLoading(false);
    });

  }
  

  const handleStatusUpdate = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsStatusModalVisible(true);
  };

  const handleAssignDriver = (type: 'pickup' | 'delivery') => {
    setDriverAssignmentType(type);
    setIsAssignDriverModalVisible(true);
  };

  const handleDriverAssignment = (values: any) => {
    setLoading(true);
    console.log(selectedRows);
    let payload:any= [];
    selectedRows.map((orderId)=>{
      let parcel= parcels.filter((parcel:any)=>parcel?.orderId== orderId)[0];
      let transportId= parcel?.shipmentTrackingDetails?.transportAgent;
      let pickupAgentId= parcel?.shipmentTrackingDetails?.pickupAgentId;
      let deliveryAgentId= parcel?.shipmentTrackingDetails?.deliveryAgentId
      driverAssignmentType === 'pickup'?
      payload.push({"orderId":orderId, "pickupAgentId":values.driver, 'transportAgentId':transportId, 'deliveryAgentId':deliveryAgentId?deliveryAgentId:0}):
      payload.push( {"orderId":orderId, "deliveryAgentId":values.driver, 'transportAgentId':transportId, 'pickupAgentId':pickupAgentId?pickupAgentId:0})
    })
    let type='pickup';
    driverAssignmentType=='pickup'?type='pickup':type='delivery';
    postData(`/api/deliveries/assign-${type}-agent`, payload).then((res)=>{
      console.log(res);
      useLoaderData(startDate, endDate);
      notification.success({
        message: 'Success',
        description: `Driver assigned to ${selectedRows.length} orders`,
        placement: 'bottomRight'
      });
      setIsAssignDriverModalVisible(false);
      setSelectedRows([]);
      driverForm.resetFields();
    }).catch((Err)=>{
      notification.error({message:"Error Assign Drivers"});
      setLoading(false)
    })

    
      // const updatedParcels = parcels.map(parcel => {
      //   if (selectedRows.includes(parcel.id)) {
      //     return {
      //       ...parcel,
      //       shipmentTrackingDetails: {
      //         ...parcel.shipmentTrackingDetails,
      //         [driverAssignmentType === 'pickup' ? 'pickupDriver' : 'deliveryDriver']: values.driver
      //       }
      //     };
      //   }
      //   return parcel;
      // });
      
      // setParcels(updatedParcels);
      // notification.success({
      //   message: 'Success',
      //   description: `Driver assigned to ${selectedRows.length} orders`,
      //   placement: 'bottomRight'
      // });
      // setIsAssignDriverModalVisible(false);
      // setSelectedRows([]);
      // driverForm.resetFields();
      // setLoading(false);

  };

  const handleStatusSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      // const updatedParcels = parcels.map(parcel => {
      //   if (parcel.id === selectedParcel.id) {
      //     return {
      //       ...parcel,
      //       shipmentTrackingDetails: {
      //         ...parcel.shipmentTrackingDetails,
      //         orderStatus: values.status
      //       }
      //     };
      //   }
      //   return parcel;
      // });
      let data={
        orderId: selectedParcel.orderId,
        orderStatus:values.status,
        'userId':userId
      };
      

      putData("/api/deliveries/update-status", [data]).then((res)=>{
        console.log(res);
        notification.success({
          message: 'Success',
          description: 'Status updated successfully',
          placement: 'bottomRight'
        });
        setIsStatusModalVisible(false);
        form.resetFields();
        setLoading(false);
        useLoaderData(startDate, endDate, null, null);
        
      }).catch((err)=>{
        setLoading(false);
        notification.success({
          message: 'Please Retry',
          description: 'Status not updated',
          placement: 'bottomRight'
        });
      })
    
    }, 1000);
  };

  const handleBulkStatusUpdate = (values: any) => {
    console.log(selectedRows);
    setLoading(true);
    setTimeout(() => { 
      let updatedParcels: Array<{ orderId: number; orderStatus: string }> = [];
       parcels.map(parcel => {
        if (selectedRows.includes(parcel.orderId)) {
          let id= parcel.orderId;
          updatedParcels.push ({
            orderId:id,
            orderStatus: values.status
          });
        }
      });
      console.log(updatedParcels);
      putData("/api/deliveries/update-status", updatedParcels).then((res)=>{
        console.log(res);

      notification.success({
        message: 'Success',
        description: `Status updated for ${selectedRows.length} parcels`,
        placement: 'bottomRight'
      });
      setIsBulkUpdateModalVisible(false);
      setSelectedRows([]);
      bulkForm.resetFields();
      useLoaderData(startDate, endDate, null, null);
    }).catch((err)=>{
      setIsBulkUpdateModalVisible(false);
      setSelectedRows([]);
      bulkForm.resetFields();
      setLoading(false);
      notification.success({
        message: 'Please Retry',
        description: 'Status not updated',
        placement: 'bottomRight'
      });
    })
    }, 1000);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log("asd"+selectedRowKeys);
      setSelectedRows(selectedRowKeys);
    },
  };

  const getMobileColumns = () => [
    {
      title: 'Order Details',
      key: 'orderDetails',
      render: (record: any) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4 mb-4"
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{record.shipmentTrackingDetails.waybillId}</span>
              <Tag
                style={{
                  ...getStatusColor(record.shipmentTrackingDetails.orderStatus),
                  borderRadius: '12px',
                  padding: '4px 12px',
                }}
              >
                {record.shipmentTrackingDetails.orderStatus}
              </Tag>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-gray-500">Receiver:</span>
                <span className="ml-2 font-medium">{record.shipmentTrackingDetails.receiverName}</span>
              </div>
              <div>
                <span className="text-gray-500">Address:</span>
                <span className="ml-2">{record.shipmentTrackingDetails.address}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500">Pickup:</span>
                  <span className="ml-2">{record.pickupDriver || 'Not Assigned'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Delivery:</span>
                  <span className="ml-2">{record.deliveryDriver || 'Not Assigned'}</span>
                </div>
              </div>
            </div>

            <Button
              type="primary"
              onClick={() => handleStatusUpdate(record)}
              disabled={!getAvailableStatuses().length}
              style={{ borderRadius: '6px', width: '100%' }}
            >
              Update Status
            </Button>
          </Space>
        </motion.div>
      ),
    },
  ];

  const getDesktopColumns = () => [
    {
      title: 'OrderId',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    
    {
      title: 'Waybill ID',
      dataIndex: ['shipmentTrackingDetails', 'waybillId'],
      key: 'waybillId',
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
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
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: ['shipmentTrackingDetails', 'orderStatus'],
      key: 'status',
      render: (status: string) => {
        const statusStyle = getStatusColor(status);
        return (
          <Tag
            style={{
              color: statusStyle.color,
              backgroundColor: statusStyle.background,
              border: `1px solid ${statusStyle.border}`,
              borderRadius: '12px',
              padding: '4px 12px',
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Pickup Driver',
      dataIndex: 'pickupDriver',
      key: 'pickupDriver',
      width:'15%'
    },
    {
      title: 'Delivery Driver',
      dataIndex: 'deliveryDriver',
      key: 'deliveryDriver',
      width:'15%'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button 
          type="primary"
          onClick={() => handleStatusUpdate(record)}
          disabled={!getAvailableStatuses().length}
          style={{ borderRadius: '6px' }}
        >
          Update Status
        </Button>
      ),
    },
  ];

  const renderCountCards = () => {
    if (role == 'ADMIN') {
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row gutter={[16, 16]} className="mb-6" justify="center">
            {[
              { label: "TOTAL ORDERS", value: counts.total, color: "#008080, #00bcd4" },
              { label: "BOOKED", value: counts.booked, color: "#ff8c00, #ffcc00" },
              { label: "IN TRANSIT", value: counts.inTransit, color: "#1e90ff, #87ceeb" },
              { label: "TRANSPORT HUB REACHED", value: counts.transportHubReached, color: "#ff4500, #ff6347" },
              { label: "TRANSPORT HUB PICKED", value: counts.transportHubpicked, color: "#8b0000, #dc143c" },
              { label: "NEAREST HUB REACHED", value: counts.nearestHubReached, color: "#6a0dad, #b19cd9" },
              { label: "OUT FOR DELIVERY", value: counts.outforDelivery, color: "#ff1493, #ff69b4" },
              { label: "DELIVERED", value: counts.delivered, color: "#228b22, #7cfc00" },
              { label: "ATTEMPTED", value: counts.attempted, color: "#708090, #a9a9a9" }
            ].map((card, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  style={{
                    background: `linear-gradient(135deg, ${card.color})`,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ color: '#fff' }}>{card.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{card.value}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>
      );




    } else   if (['DRIVER','BIKE_CAPTAIN'].includes(role)) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row gutter={[16, 16]} className="mb-6" justify="center">
            {[
              { label: "TOTAL DELIVIERIES", value: counts.transportHubReached+counts.transportHubpicked+counts.outforDelivery+counts.delivered+counts.attempted, color: "#008080, #00bcd4" },
              { label: "Pickup Orders", value: counts.transportHubReached, color: "#ff4500, #ff6347" },
              // { label: "Pickup Inprogress", value: counts.transportHubpicked, color: "#8b0000, #dc143c" },
              { label: "Completed Pickup", value: counts.nearestHubReached, color: "#6a0dad, #b19cd9" },
              { label: "Delivery Orders", value: counts.outforDelivery, color: "#ff1493, #ff69b4" },
              { label: "Completed Delivery", value: counts.delivered, color: "#228b22, #7cfc00" },
              { label: "Attempted", value: counts.attempted, color: "#708090, #a9a9a9" }
            ].map((card, index) => (
              <Col key={index} xs={24} sm={24} md={8} lg={6} xl={4}>
                <Card
                  style={{
                    background: `linear-gradient(135deg, ${card.color})`,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ color: '#fff' }}>{card.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{card.value}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>
      );




    } else {

      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row gutter={[16, 16]} className="mb-6" justify="space-between">
            {/* TOTAL ORDERS */}
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #1677ff 0%, #69b1ff 100%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ color: '#fff' }}>TOTAL ORDERS</div>
                <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>
                  {counts.total}
                </div>
              </Card>
            </Col>

            {/* BOOKED */}
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#faad14' }}>BOOKED</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d48806' }}>
                  {counts.booked}
                </div>
              </Card>
            </Col>

            {/* IN TRANSIT */}
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#1890ff' }}>IN TRANSIT</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#096dd9' }}>
                  {counts.inTransit}
                </div>
              </Card>
            </Col>

            {/* HUBGO IN PROGRESS */}
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card
                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#722ed1', fontSize: '12px' }}>HUBGO INPROGRESS</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                  {counts.total - counts.booked - counts.inTransit}
                </div>
              </Card>
            </Col>

            {/* DELIVERED */}
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#52c41a' }}>DELIVERED</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#389e0d' }}>
                  {counts.delivered}
                </div>
              </Card>
            </Col>
          </Row>
        </motion.div>
      );
    }
  }
  
  
  

  const renderTable = (dataSource: any[]) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table 
        rowSelection={rowSelection}
        columns={isMobile ? getMobileColumns() : getDesktopColumns()}
        dataSource={parcels}
        rowKey="orderId"
        scroll={{ x: true }}
        pagination={{
          simple: isMobile,
          // pageSize: isMobile ? 5 : 10,
          showTotal: (total) => `Total ${total} items`,
          showSizeChanger: !isMobile,
          style: { marginTop: '16px' }
        }}
        className="shadow-sm rounded-lg overflow-hidden"
      />
    </motion.div>
  );
    const getTableData = () => {
    if (['DRIVER','BIKE_CAPTAIN'].includes(userRole)) {
      const pickupOrders = parcels.filter(
        (p) =>
          p.shipmentTrackingDetails?.orderStatus ===
            STATUS.TRANSPORT_HUB_REACHED ||
          p.shipmentTrackingDetails?.orderStatus === STATUS.TRANSPORT_HUB_PICKED
      );
      const deliveryOrders = parcels.filter(
        (p) => p.shipmentTrackingDetails?.orderStatus === STATUS.OUT_FOR_DELIVERY
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
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabBarGutter={isMobile ? 8 : 16}
        size={isMobile ? 'small' : 'middle'}
        className="bg-white p-4 rounded-lg shadow-sm"
      >
        <TabPane tab="Current Orders" key="1">
          {renderTable(allOrders)}
        </TabPane>
        {(role =='DRIVER' || role =='BIKE_CAPTAIN'|| role=='ADMIN') &&
        <TabPane tab="Pickup Assignment" key="2">
          {selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="primary"
                onClick={() => handleAssignDriver('pickup')}
                style={{ 
                  marginBottom: 16,
                  borderRadius: '6px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
                }}
                block={isMobile}
              >
                Assign Pickup Driver
              </Button>
            </motion.div>
          )}
          {renderTable(pickupAssignment)}
        </TabPane>}
        {(role =='DRIVER'|| role =='BIKE_CAPTAIN'||role=='ADMIN') &&
        <TabPane tab="Delivery Assignment" key="3">
          {selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="primary"
                onClick={() => handleAssignDriver('delivery')}
                style={{ 
                  marginBottom: 16,
                  borderRadius: '6px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
                }}
                block={isMobile}
              >
                Assign Delivery Driver
              </Button>
            </motion.div>
          )}
          {renderTable(deliveryAssignment)}
        </TabPane>}
        {/* {(role) &&
        <TabPane tab="All Orders" key="4">
          {selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="primary"
                onClick={() => handleAssignDriver('delivery')}
                style={{ 
                  marginBottom: 16,
                  borderRadius: '6px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
                }}
                block={isMobile}
              >
                Assign Delivery Driver
              </Button>
            </motion.div>
          )}
        
        </TabPane>} */}
      </Tabs>
    );
  };

  const handleFinish=async (values:any)=>{
    setLoading(true);
    console.log(values);
    if(!values || values?.length==0){
      setLoading(false);
    }else{
      let str= values[0].format('YYYY-MM-DD'),end = values[1].format('YYYY-MM-DD')
      setStartDate(str);
      setEndDate(end);
      console.log(startDate, endDate );
      useLoaderData(str, end, null, null);
    }


  }
  return (
    <Spin spinning={loading}>
      <Content className={isMobile ? "p-2" : "p-6"}>
        <div className="max-w-7xl mx-auto">
          
          {renderCountCards()}

          
        <Form layout="vertical"  form={dateRangePickerForm}onFinish={handleFinish}>
          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select a date range' }]}
          >
            <RangePicker
              format="YYYY-MM-DD"
              style={{ width: 300 }}
           
              onChange={handleFinish}

            />
          </Form.Item>
          
      
        </Form>

          {selectedRows.length > 0 && activeTab === '1' && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="primary"
                onClick={() => setIsBulkUpdateModalVisible(true)}
                block={isMobile}
                style={{ 
                  borderRadius: '6px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
                }}
              >
                Update Status for {selectedRows.length} Selected Orders
              </Button>
            </motion.div>
          )}

          {(['DRIVER','BIKE_CAPTAIN'].includes(userRole) )? (
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              size={isMobile ? 'small' : 'middle'}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <TabPane tab="Pickup Orders" key="1">
                {renderTable(getTableData().pickupOrders)}
              </TabPane>
              <TabPane tab="Delivery Orders" key="2">
                {renderTable(getTableData().deliveryOrders)}
              </TabPane>
            </Tabs>
          ) : (
            renderAdminTabs()
          )}

          <Modal
            title="Update Status"
            open={isStatusModalVisible}
            onCancel={() => setIsStatusModalVisible(false)}
            footer={null}
            width={isMobile ? '90%' : 520}
            className="rounded-lg"
          >
            <Form
              form={form}
              onFinish={handleStatusSubmit}
              layout="vertical"
            >
              <Form.Item
                name="status"
                label="Select Status"
                rules={[{ required: true, message: 'Please select a status' }]}
              >
                <Select placeholder="Select new status">
                  {getAvailableStatuses().map(status => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  loading={loading}
                  style={{ borderRadius: '6px' }}
                >
                  Update Status
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Bulk Update Status"
            open={isBulkUpdateModalVisible}
            onCancel={() => {
              setIsBulkUpdateModalVisible(false);
              setSelectedRows([]);
            }}
            footer={null}
            width={isMobile ? '90%' : 520}
            className="rounded-lg"
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
                  {getAvailableStatuses().map(status => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  loading={loading}
                  style={{ borderRadius: '6px' }}
                >
                  Update Status for {selectedRows.length} Orders
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={`Assign ${driverAssignmentType === 'pickup' ? 'Pickup' : 'Delivery'} Driver`}
            open={isAssignDriverModalVisible}
            onCancel={() => {
              setIsAssignDriverModalVisible(false);
              setSelectedRows([]);
            }}
            footer={null}
            width={isMobile ? '90%' : 520}
            className="rounded-lg"
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
                {mockDrivers?.length>0 &&
                <Select placeholder="Select driver">
                  {mockDrivers
                    .map(driver => (
                      <Select.Option key={driver.userLanId} value={driver.userLanId}>
                        {driver.fullName}
                      </Select.Option>
                    ))}
                </Select>}
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  loading={loading}
                  style={{ borderRadius: '6px' }}
                >
                  Assign Driver to {selectedRows.length} Orders
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Spin>
  );
};

export default Operations;