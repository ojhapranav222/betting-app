import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

function PrivateRoute() {
    const isAuthenticated = !!localStorage.getItem('');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;