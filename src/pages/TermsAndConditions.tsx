import React from 'react';
import { Bell, UserCircle, ChevronDown, Scale, Package, AlertTriangle, Truck, CreditCard } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div >


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <Scale className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-gray-700">
                  Welcome to HubGo. By accessing or using our services, you agree to comply with these terms and conditions. Please read them carefully before using our services.
                </p>
              </div>
            </section>

            {/* Services Offered */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Services Offered</h2>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <Truck className="w-6 h-6 text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Delivery Services</h3>
                    <p className="text-gray-600">HubGo provides last-mile delivery services within Chennai</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Note: The Company reserves the right to decline services for any shipment that does not meet our terms.
                </p>
              </div>
            </section>

            {/* Prohibited Items */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Prohibited Items</h2>
              <div className="bg-red-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="font-semibold text-gray-800">The following items are prohibited:</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Hazardous Materials</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      <li>Flammable substances</li>
                      <li>Explosive materials</li>
                      <li>Corrosive items</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Valuable Items</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      <li>Jewelry exceeding ₹10,000</li>
                      <li>Cash or currency</li>
                      <li>Precious stones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Responsibilities */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Customer Responsibilities</h2>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Package className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Proper Packaging</h3>
                      <p className="text-gray-600">Ensure shipments are securely packaged to prevent damage during transit</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-200 text-green-600 mr-3 mt-1">i</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Accurate Information</h3>
                      <p className="text-gray-600">Provide correct delivery details including recipient name, address, and contact number</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Payment Terms</h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">Accepted Payment Methods</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h4 className="font-semibold text-gray-800">Cash</h4>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h4 className="font-semibold text-gray-800">UPI</h4>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h4 className="font-semibold text-gray-800">Cards</h4>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For questions or concerns about these Terms and Conditions, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <p className="text-blue-600">support@hubgo.in</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <p className="text-blue-600">+91 7402015542</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="text-center text-gray-500 text-sm mt-8">
              Last updated: Jan 2025
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;