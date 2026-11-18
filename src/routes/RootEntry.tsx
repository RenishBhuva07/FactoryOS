import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Hero } from '../pages/hero';

export const RootEntry: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Hero />;
};

export default RootEntry;
