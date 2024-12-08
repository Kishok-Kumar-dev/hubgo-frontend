import React, { useState } from 'react';
import { Input, Button, Card, Steps, Empty } from 'antd';
import { Search } from 'lucide-react';

const { Step } = Steps;

const TrackParcel: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (trackingId) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card title="Track Your Parcel">
        <div className="flex gap-4 mb-8">
          <Input 
            placeholder="Enter waybill number or tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            size="large"
          />
          <Button 
            type="primary" 
            icon={<Search size={20} />}
            size="large"
            onClick={handleSearch}
          >
            Track
          </Button>
        </div>

        {searched && trackingId ? (
          <div className="space-y-6">
            <Steps
              current={2}
              items={[
                { title: 'At Bus Terminal' },
                { title: 'In Transit to Hub' },
                { title: 'Out for Delivery' },
                { title: 'Delivered' },
              ]}
            />

            <Card size="small" title="Tracking Details" className="mt-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">Out for Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Delivery</span>
                  <span className="font-medium">Today by 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </Card>
          </div>
        ) : searched ? (
          <Empty description="No tracking information found" />
        ) : null}
      </Card>
    </div>
  );
};

export default TrackParcel;