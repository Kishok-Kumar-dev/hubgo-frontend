import React from 'react';
import { Bell, UserCircle, ChevronDown, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div >

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-gray-700">
                  At HubGo, we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Name and contact details</li>
                    <li>Delivery addresses</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Usage data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <div className="bg-orange-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 mr-3">1</div>
                    <p className="text-gray-700">To provide and improve our delivery services</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 mr-3">2</div>
                    <p className="text-gray-700">Process your transactions and track shipments</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 mr-3">3</div>
                    <p className="text-gray-700">Communicate with you about your deliveries</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 mr-3">4</div>
                    <p className="text-gray-700">Improve our website and services</p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Encryption</h4>
                    <p className="text-gray-600">All data is encrypted in transit and at rest</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Access Controls</h4>
                    <p className="text-gray-600">Strict access controls and authentication</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <p className="text-blue-600">support@hubgo.com</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <p className="text-blue-600">+91 8148741522</p>
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

export default PrivacyPolicy;