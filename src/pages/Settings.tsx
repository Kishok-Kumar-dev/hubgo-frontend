import React, { useState } from 'react';
import { Button, Modal, Form, App } from 'antd';
import { Plus } from 'lucide-react';
import type { User } from '../types/auth';
import UserTable from '../components/settings/UserTable';
import UserForm from '../components/settings/UserForm';

const Settings: React.FC = () => {
  const { message, modal } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // Dummy data - replace with actual API calls
  const [users] = useState<User[]>([
    { id: '1', name: 'John Admin', email: 'john@hubgo.com', role: 'admin', active: true },
    { id: '2', name: 'Mike Driver', email: 'mike@hubgo.com', role: 'driver', active: true },
    { id: '3', name: 'Sarah Transport', email: 'sarah@hubgo.com', role: 'transport', active: true },
  ]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user: User) => {
    modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `This will permanently delete ${user.name}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        message.success('User deleted successfully');
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (editingUser) {
      message.success('User updated successfully');
    } else {
      message.success('User created successfully');
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

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

      <UserTable 
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
        />
      </Modal>
    </div>
  );
};

export default Settings;