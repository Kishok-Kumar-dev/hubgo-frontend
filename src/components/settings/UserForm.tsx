import React from 'react';
import { Form, Input, Select, Space, Button } from 'antd';
import type { User } from '../../types/auth';

interface UserFormProps {
  form: any;
  editingUser: User | null;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ form, editingUser, onCancel }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      className="mt-4"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
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
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="driver">Driver</Select.Option>
          <Select.Option value="transport">Transport Agent</Select.Option>
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