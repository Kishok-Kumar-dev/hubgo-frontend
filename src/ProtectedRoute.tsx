// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
    let isAuthenticated= false;
  if (!token || !isValidToken(token)) {
    isAuthenticated=false;
    navigate('/', { replace: true });
  } else {
    isAuthenticated=true;

  }

  if (!isAuthenticated) {

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user')
    notification.error({message:"Session Logged Out!", duration:2})
    return <Navigate to="/" replace />;
  }

  // If authenticated, return the element (the protected page)
  return element;
};

function isValidToken(token: string): boolean {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const expiry = decoded.exp * 1000; // JWT expiration is in seconds, so convert to milliseconds
      return Date.now() < expiry;
    } catch (e) {
      return false;
    }
  }
export default ProtectedRoute;
