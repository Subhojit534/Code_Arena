import React from 'react';
import { useLocation } from 'react-router-dom';
import StudentNavigation from './StudentNavigation';
import AdminNavigation from './AdminNavigation';

const RoleBasedNavigation = ({ userRole = 'student', onLogout }) => {
  const location = useLocation();
  
  const isStudentRoute = location?.pathname?.startsWith('/student-login-registration') || 
                         location?.pathname?.startsWith('/coding-interface');
  
  const isAdminRoute = location?.pathname?.startsWith('/admin-login') || 
                       location?.pathname?.startsWith('/admin-dashboard') || 
                       location?.pathname?.startsWith('/problem-management') || 
                       location?.pathname?.startsWith('/test-case-management');

  if (isStudentRoute || userRole === 'student') {
    return <StudentNavigation onLogout={onLogout} />;
  }

  if (isAdminRoute || userRole === 'admin') {
    return <AdminNavigation onLogout={onLogout} />;
  }

  return <StudentNavigation onLogout={onLogout} />;
};

export default RoleBasedNavigation;