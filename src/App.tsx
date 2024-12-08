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
            <Route path="/" element={<Homepage/>}/>
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="book" element={<BookParcel />} />
              <Route path="track" element={<TrackParcel />} />
              <Route path="settings" element={<Settings />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;