import React, { useEffect, useState } from 'react';
import { Edit2, Plus, Trash2, X, ChevronRight, MapPin, Mail, Phone, Building, User as UserIcon } from 'lucide-react';
import { postData ,getData} from '../service/AppService';
import { notification, Spin } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface User {
  userLanId?: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  secondaryPhNo: string;
  email: string;
  password?: string;
  userRole: string;
  verificationId?: string;
  transportId?: string;
  vechileNo?: string;
  userAddress: string;
  userCoordinates?: string;
  isActive: boolean;
}

const Settings: React.FC = () => {
  const navigate= useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [transport, setTransport] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [activeTab, setActiveTab] = useState('ALL');
  const [spinner, setSpinner] =useState(false);
  
  useEffect(() => {
    const res = localStorage.getItem('user');
    let userJson = JSON.parse(res || '{}');
    if (userJson.roles != 'ADMIN' ) {
        navigate('/dashboard', { replace: true });
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setSpinner(true);    

    getData('/auth/user/list').then((response:any) => {
      const data=response;
      setUsers(data);
      const transportUsers = data.filter((user: User) => user.userRole === 'TRANSPORT');
      setTransport(transportUsers);
    } ).catch((err:any)=>{
      setSpinner(false);
        console.error('Error loading users:', err);
        showNotification('Error loading users', 'error');
    }).finally(()=>{
      setSpinner(false);
    })

  };

  const showNotification = (message: string, type: 'success' | 'error') => {
  
 
          const color = type === 'success' ? 'green' : 'red';
          notification.open({
            message: message,
            description: '',
            icon: <CheckCircleOutlined style={{ color }} />,
          });
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setSpinner(true);
    e.preventDefault();
      const endpoint = editingUser ? '/auth/user/update' : '/auth/signup';
       postData(endpoint, formData).then((response:any)=>{
        setIsModalOpen(false)
        if(response=='User updated successfully!'){
          showNotification(
            `User ${editingUser ? 'updated' : 'created'} successfully`,
            'success'
          );
          setIsModalOpen(false);
          setFormData({});
          setEditingUser(null);
    
        }      
        loadUsers();


      }). catch ((error)=>{
        setSpinner(false);
        setIsModalOpen(true);
        console.error('Error saving user:', error.response.data);
        showNotification(""+error.response.data, 'error');
      }) 
     
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Are you sure you want to delete ${user.fullName}?`)) return;

      postData('/auth/user/delete', user).then((res) => {
        console.log(res);
        showNotification('User deleted successfully', 'success');
        loadUsers();
      }).catch((err) => {
        console.log(err);
        console.error('Error deleting user:', err);
      showNotification('Error deleting user', 'error');
      });


  };

  const getCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(
          address
        )}&api_key=tIs2LqWp0fl4yzOrORmeJcxy2y63Ya8ybWR3Yd4k`
      );
      const data = await response.json();
      if (data.geocodingResults?.[0]?.geometry?.location) {
        const { lat, lng } = data.geocodingResults[0].geometry.location;
        setFormData(prev => ({
          ...prev,
          userCoordinates: `${lat},${lng}`
        }));
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const filteredUsers = activeTab === 'ALL' 
    ? users 
    : users.filter(user => user.userRole === activeTab);

  const roles = [
    'ALL',
    'ADMIN',
    'DRIVER',
    'BIKE_CAPTAIN',
    'TRANSPORT',
    'TRANSPORT_HUB',
    'BOOKING_AGENT'
  ];

  return (
    <Spin spinning={spinner} size="large">
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <div id="notification" className="hidden"></div>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <button
              onClick={() => {
                setEditingUser(null);
                setFormData({});
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* Role Tabs - Horizontal scroll on mobile */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveTab(role)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user: User) => (
            <div key={user.userLanId} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.businessName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setFormData(user);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm truncate">{user.userAddress}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.isActive 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {user.userRole.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName || ''}
                      onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName || ''}
                      onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber || ''}
                      onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.secondaryPhNo || ''}
                      onChange={e => setFormData(prev => ({ ...prev, secondaryPhNo: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      required={!editingUser}
                      value={formData.password || ''}
                      onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      VerificationId
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.verificationId || ''}
                      onChange={e => setFormData(prev => ({ ...prev, verificationId: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      required
                      value={formData.userRole || ''}
                      onChange={e => {
                        setSelectedRole(e.target.value);
                        setFormData(prev => ({ ...prev, userRole: e.target.value }));
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Role</option>
                      <option value="ADMIN">Admin</option>
                      <option value="DRIVER">Driver</option>
                      <option value="BIKE_CAPTAIN">BIKE CAPTAIN</option>
                      <option value="TRANSPORT">Transport</option>
                      <option value="TRANSPORT_HUB">Transport Hub</option>
                      <option value="BOOKING_AGENT">Booking Agent</option>
                    </select>
                  </div>

                  {(formData.userRole === 'DRIVER'  || formData.userRole === 'BIKE_CAPTAIN')&& (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.vechileNo || ''}
                        onChange={e => setFormData(prev => ({ ...prev, vechileNo: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {(formData.userRole === 'TRANSPORT_HUB' || formData.userRole === 'BOOKING_AGENT') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Transport Agent
                      </label>
                      <select
                        required
                        value={formData.transportId || ''}
                        onChange={e => setFormData(prev => ({ ...prev, transportId: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Transport Agent</option>
                        {transport.map(t => (
                          <option key={t.userLanId} value={t.userLanId}>
                            {t.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        required
                        value={formData.userAddress || ''}
                        onChange={e => setFormData(prev => ({ ...prev, userAddress: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => formData.userAddress && getCoordinates(formData.userAddress)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        Get Coordinates
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Coordinates
                    </label>
                    <input
                      type="text"
                      value={formData.userCoordinates || ''}
                      onChange={e => setFormData(prev => ({ ...prev, userCoordinates: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Latitude,Longitude"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingUser ? 'Update' : 'Create'} User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
       
      )}
    </div>
    </Spin>
    
  );
};

export default Settings;