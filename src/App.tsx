// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Homepage from './home/Homepage';
import ProtectedRoute from './ProtectedRoute';
import Bookings from './pages/bookings';
import TrackOrder from './pages/TrackOrder';
import { PriceSetting } from './pages/PriceSetting';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f97316',
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<MainLayout />}>
              <Route
                path="settings"
                element={<ProtectedRoute element={<Settings />} />}
              />
               <Route
                path="pricesettings"
                element={<ProtectedRoute element={<PriceSetting />} />}
              />
              <Route
                path="booking"
                element={<ProtectedRoute element={<Bookings />} />}
              />
                 <Route
                path="trackorder"
                element={<ProtectedRoute element={<TrackOrder />} />}
              />
              <Route index element={<ProtectedRoute element={<Home />} />} />{' '}
              {/* Default route */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
