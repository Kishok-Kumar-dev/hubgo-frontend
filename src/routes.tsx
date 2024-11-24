import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Driver from './pages/Driver';
import Shipping from './pages/Shipping';
import TrackingPage from './pages/TrackingPage';
import Users from  './pages/Users';
const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/* Private routes inside MainLayout */}
                <Route path="/dashboard" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="tracking" element={<TrackingPage />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="driver" element={<Driver />} />
                    <Route path="users" element={<Users />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
