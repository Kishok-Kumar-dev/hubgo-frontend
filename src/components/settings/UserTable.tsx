import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { Edit2, Trash2 } from 'lucide-react';
import type { User, UserRole } from '../../types/auth';

interface UserTableProps {
  users: any[];
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
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
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
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
            onClick={() => onEdit(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<Trash2 size={16} />} 
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserTable;