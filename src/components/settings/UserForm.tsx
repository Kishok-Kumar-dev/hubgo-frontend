import React from 'react';
import { Form, Input, Select, Space, Button } from 'antd';
import type { User } from '../../types/auth';

interface UserFormProps {
  form: any;
  editingUser: User | null;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}


const UserForm: React.FC<UserFormProps> = ({ form, editingUser, onCancel, onSubmit }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      className="mt-4"
      onFinish={onSubmit}
    >
      <Form.Item
        name="userLanId"
        hidden>
          
        <Input />
        </Form.Item>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="businessName"
        label="Business Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="PhoneNumber"
        rules={[{ required: true, message: 'Please input the phone Number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input the email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="password"
        rules={[
          { required: true, message: 'Please input the password!' },
          { min: 6, message: 'Password must be at least 6 characters long' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userRole"
        label="Role"
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="DRIVER">DRIVER</Select.Option>
          <Select.Option value="TRANSPORT">TRANSPORT</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserForm;