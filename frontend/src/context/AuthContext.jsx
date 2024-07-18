// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: ""
    });

    const login = (username) => {
        setUser({ isLoggedIn: true, username });
    };

    const logout = () => {
        setUser({ isLoggedIn: false, username: "" });
    };

    const setUserDetails = (userDetails) => {
        setUser({ isLoggedIn: true, username: userDetails.username });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
