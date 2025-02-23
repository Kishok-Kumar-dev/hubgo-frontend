import React, { useEffect, useState } from 'react';
import {message, notification, Spin } from 'antd';
import { Save } from 'lucide-react';
import { getData, postData } from '../service/AppService';

 type PackageSize = 'L' | 'M' | 'S' | 'XS';

interface PricingSettings {
  discountIncrement: number;
  maxDiscount: number;
  packagePrices: {
    L: number;
    M: number;
    S: number;
    XS: number;
  };
  OVERWEIGHT_PER_KG: number;
  distanceRates: {
    freeKm: number;
    firstTier: {
      uptoKm: number;
      price: number;
    };
    secondTier: {
      uptoKm: number;
      price: number;
    };
    thirdTier: {
      uptoKm: number;
      price: number;
    };
    beyondPrice: number;
  };
}

// const defaultSettings: PricingSettings = {
//   discountIncrement: 20,
//   maxDiscount: 80,
//   packagePrices: {
//     L: 200,
//     M: 150,
//     S: 60,
//     XS: 50,
//   },
//   distanceRates: {
//     freeKm: 5,
//     firstTier: {
//       uptoKm: 10,
//       price: 15,
//     },
//     secondTier: {
//       uptoKm: 20,
//       price: 25,
//     },
//     thirdTier: {
//       uptoKm: 30,
//       price: 30,
//     },
//     beyondPrice: 2,
//   },
//   OVERWEIGHT_PER_KG: 7,
// };

export function PriceSetting() {
  const [formData, setFormData] = useState<any>();
  const [loading,setLoading]= useState(false);
  const  [isSettings, setIsSettings]= useState(false);
  useEffect(()=>{
    setLoading(true);
    getData('/api/config-json/pricesettings').then((res:any)=>{
      let json:any= JSON.parse(res.jsonData);
      setFormData(json);
      setIsSettings(true);
    }).catch(err=>{
      notification.error({message:"Internal Server Error "});
    }).finally(()=>{
      setLoading(false);
    })

  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here you would typically save the settings to your backend or local storage
    console.log('Settings saved:', formData);
    let config={
      "configKey": "pricesettings",
      "jsonData":JSON.stringify(formData),
      "isActive":true
    }
    postData('/api/config-json', config).then((res)=>{
      console.log(res);
      setLoading(false);
    })
  };


  return (

    <Spin spinning={loading}>
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pricing Settings</h1>
      </div>

   { isSettings&&  <form onSubmit={handleSubmit} className="space-y-8">
        {/* Package Prices */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Package Prices</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       
            {(Object.keys(formData.packagePrices) as PackageSize[]).map((size) => (
              <div key={size}>
                <label className="block text-sm font-medium text-gray-700">
                  {size} Package Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.packagePrices[size]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      packagePrices: {
                        ...prev.packagePrices,
                        [size]: Number(e.target.value),
                      },
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overweight Charge */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Overweight Charges</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price per kg (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.OVERWEIGHT_PER_KG}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  OVERWEIGHT_PER_KG: Number(e.target.value),
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Discount Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Discount Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount Increment (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discountIncrement}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountIncrement: Number(e.target.value),
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.maxDiscount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxDiscount: Number(e.target.value),
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Distance Rate Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Distance Rate Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Free Kilometers
              </label>
              <input
                type="number"
                min="0"
                value={formData.distanceRates.freeKm}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    distanceRates: {
                      ...prev.distanceRates,
                      freeKm: Number(e.target.value),
                    },
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {['first', 'second', 'third'].map((tier, index) => (
              <div key={tier} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier Up to (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.distanceRates[`${tier}Tier`].uptoKm}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        distanceRates: {
                          ...prev.distanceRates,
                          [`${tier}Tier`]: {
                            ...prev.distanceRates[`${tier}Tier`],
                            uptoKm: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.distanceRates[`${tier}Tier`].price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        distanceRates: {
                          ...prev.distanceRates,
                          [`${tier}Tier`]: {
                            ...prev.distanceRates[`${tier}Tier`],
                            price: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Beyond Third Tier Price per km (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.distanceRates.beyondPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    distanceRates: {
                      ...prev.distanceRates,
                      beyondPrice: Number(e.target.value),
                    },
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>}
    </div>
    </Spin>
  );
}