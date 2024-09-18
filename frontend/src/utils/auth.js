import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
