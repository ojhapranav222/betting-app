import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

function AdminRoute() {
    const isAuthenticated = !!localStorage.getItem('admin');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute;