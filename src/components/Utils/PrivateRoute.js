import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner'; // Ensure this is created next

/**
 * A wrapper component that protects routes based on authentication status and user roles.
 * @param {Object} children - The component(s) to render if access is granted (e.g., <AdminDashboard />).
 * @param {Array} allowedRoles - An array of roles allowed to access this route (e.g., ['admin']).
 */
const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        // Show a loading spinner while checking auth status from localStorage
        return <LoadingSpinner />;
    }

    // 1. Check if the user is authenticated at all
    if (!isAuthenticated) {
        // If not logged in, redirect them to the login page.
        // We use the 'replace: true' prop and pass the current location 
        // in state so they can be redirected back after successful login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check if the user has the required role (only necessary for admin routes)
    const userRole = user?.role; 
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // If the user is logged in but does not have the correct role (e.g., a regular user tries to access /admin)
        alert("Access Denied: You do not have permission to view this page.");
        return <Navigate to="/" replace />; // Redirect to home page
    }

    // 3. If authenticated and role matches (or no specific role is required), render the children
    return children;
};

export default PrivateRoute;
