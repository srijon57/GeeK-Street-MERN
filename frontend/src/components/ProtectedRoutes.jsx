import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    if (!user.isLoggedIn) {
        return <Navigate to="/Login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" />; 
    }

    return children;
};

export default ProtectedRoute;
