import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.jsx';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;  
};

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />; 
    }

    if (!user.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />; 
    }

    return children;  
};

export default ProtectedRoute;
