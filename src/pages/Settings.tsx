import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, App, Tag, Space, Table } from 'antd';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import type { User } from '../types/auth';
import UserTable from '../components/settings/UserTable';
import UserForm from '../components/settings/UserForm';
import { postData ,getData} from '../service/AppService';

const Settings: React.FC = () => {
  const { message, modal } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // Dummy data - replace with actual API calls
  const [users,setUsers] = useState<any>();

  useEffect(() => {
    useLoaderData();
  }, []);

  const useLoaderData=()=>{
    getData('/auth/user/list').then((res:any) => {
      console.log(res);

      setUsers(res);
      console.log(users);
    });
  }


  const handleEdit = (user: any) => {
    setEditingUser(user);
    user.password="";
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user: any) => {
    modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `This will permanently delete ${user.fullName}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {

        postData('/auth/user/delete', user).then((res) => {
          console.log(res);
          message.success('User deleted successfully');
          useLoaderData();
        }).catch((err) => {
          console.log(err);
          message.error('Error deleting user');
          useLoaderData();

        });

      },
    });
  };

  const handleSubmit = (values: any) => {
    if (editingUser) {

      postData('/auth/user/update', values).then((res) => { 
        console.log(res);
        message.success('User updated successfully');
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
        useLoaderData();
      }).catch((err) => {   
        console.log(err);
        setIsModalVisible(false);
        setEditingUser(null);
        message.error('Error updating user');
      });
    } else {
      console.log(values);

      postData('/auth/signup', values).then((res) => {
        console.log(res);
        message.success('User created successfully');
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
        useLoaderData();
      }).catch((err) => {
        console.log(err);
        setIsModalVisible(false);
        setEditingUser(null);
        message.error('Error creating user');
      }); 
   
    }
  
  };
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Business Name',
      dataIndex: 'businessName',
      key: 'businessName',
    },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Role',
      dataIndex: 'userRole',
      key: 'userRole',
      render: (role: any) => (
        <Tag color={role === 'ADMIN' ? 'blue' : role === 'DRIVER' ? 'green' : 'orange'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active: boolean) => (
        <Tag color={active ? 'success' : 'error'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button 
            type="text" 
            icon={<Edit2 size={16} />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<Trash2 size={16} />} 
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Button 
          type="primary" 
          icon={<Plus size={16} />} 
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add User
        </Button>
      </div>

      <Table columns={columns} dataSource={users} rowKey="id" />;


      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <UserForm 
          form={form}
          editingUser={editingUser}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={(val)=>handleSubmit(val)}
        />
      </Modal>
    </div>
  );
};

export default Settings;