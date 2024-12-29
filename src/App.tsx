// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import BookParcel from './pages/BookParcel';
import TrackParcel from './pages/TrackParcel';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './home/Homepage';
import OlaIntegration from './pages/OLAIntegeration';
import ProtectedRoute from './ProtectedRoute';

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Route for dashboard pages */}
            <Route path="/dashboard" element={<MainLayout />}>
              <Route
                path="book"
                element={<ProtectedRoute element={<BookParcel />} />}
              />
              <Route
                path="track"
                element={<ProtectedRoute element={<TrackParcel />} />}
              />
              <Route
                path="settings"
                element={<ProtectedRoute element={<Settings />} />}
              />
              <Route
                path="ola"
                element={<ProtectedRoute element={<OlaIntegration />} />}
              />
              <Route index element={<ProtectedRoute element={<Home />} />} /> {/* Default route */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
