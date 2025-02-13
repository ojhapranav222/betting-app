import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function AdminRoute() {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
    const isAdmin = localStorage.getItem('username') === 'admin'; // Check if stored as admin

    if (!isAuthenticated || !isAdmin) {
        alert("Not authorized"); // Show alert for unauthorized access
        return <Navigate to="/" />; // Redirect to Landing Page
    }

    return <Outlet />;
}

export default AdminRoute;