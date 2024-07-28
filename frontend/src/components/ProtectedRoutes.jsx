import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.jsx';
const isAuthenticated = () => {
    return true;
}

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    if (!isAuthenticated()) {
        return <Navigate to="/admin" replace />;
    }
    if (!user.isLoggedIn) {
        return <Navigate to="/Login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" />; 
    }

    return children;
};

export default ProtectedRoute;
