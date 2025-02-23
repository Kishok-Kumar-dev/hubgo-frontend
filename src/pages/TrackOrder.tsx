import React, { useState } from 'react';
import { Package, Truck, MapPin, Box, Clock, Phone, X } from 'lucide-react';
import { getData } from '../service/AppService';

function TrackOrder() {
  const [searchText, setSearchText] = useState('');
  const [trackingDetails, setTrackingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchOrder = async (trackingId: string) => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError(null);

    getData(`/api/booking/track-details?orderId=${trackingId}`).then(res => {
      setTrackingDetails(res);
    }).catch(err => {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracking details');
      setTrackingDetails(null);
    }).finally(() => {
      setLoading(false);
    });
  };

  const clearResults = () => {
    setTrackingDetails(null);
    setSearchText('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Track Your Delivery</h2>
          <p className="text-lg text-gray-200 mb-8">Real-time updates on your package's journey</p>
          
          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="flex gap-2 bg-white p-2 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., HG1116)"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                onClick={() => searchOrder(searchText)}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Package className="h-5 w-5" />
                    <span>Track Now</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-red-500 bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trackingDetails && (
          <div className="space-y-8 relative">
            {/* Close Button */}
            <button
              onClick={clearResults}
              className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close tracking results"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-500" />
                Order Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">{trackingDetails.orderId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Waybill:</span>
                    <span className="font-semibold">{trackingDetails.shipmentTrackingDetails.waybillId}</span>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Sender Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.senderMobileNo || 'N/A'}</span>
                  </div>
                </div>

                {/* Receiver Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Receiver Details</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{trackingDetails.shipmentTrackingDetails.receiverMobileNo || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-500" />
                Tracking Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {trackingDetails.shipmentTrackingDetails.transportBooked && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Order Booked</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.transportBooked).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.inTransit && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Departed at Transport Hub</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.inTransit).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {trackingDetails.shipmentTrackingDetails.transportHubReached && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Arrived at Transport Hub</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.transportHubReached).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {trackingDetails.shipmentTrackingDetails.transportHubPicked && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Transport Hub Picked</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.transportHubPicked).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.nearestHubReached && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Reached Nearest Hub</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.nearestHubReached).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {trackingDetails.shipmentTrackingDetails.outForDelivery && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Out for Delivery</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.outForDelivery).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {trackingDetails.shipmentTrackingDetails.delivered && (
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-16">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Delivered</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trackingDetails.shipmentTrackingDetails.delivered).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Box className="h-6 w-6 text-orange-500" />
                Package Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trackingDetails.shipmentProductDetails.map((pkg: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Box className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{pkg.packageId}</h4>
                            <p className="text-sm text-gray-500">{pkg.productContent || 'N/A'}</p>
                          </div>
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {pkg.productSize}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="font-medium">{pkg.productWeight} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium">{pkg.productQuantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-medium">{pkg.productValue ? `₹${pkg.productValue}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Charges</p>
                            <p className="font-medium">
                              {pkg.transportCharges && pkg.hubgoCharges 
                                ? `₹${pkg.transportCharges + pkg.hubgoCharges}`
                                : 'N/A'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TrackOrder;