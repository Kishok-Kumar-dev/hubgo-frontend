// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token || !isValidToken(token)) {
      setIsAuthenticated(false);
      navigate('/', { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated;
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

export default useAuth;
