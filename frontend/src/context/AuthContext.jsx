import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        role: "",
        username: ""
    });

    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            // Assuming you have a way to get user info from the token or backend
            // For simplicity, let's assume the token contains the user info
            const userInfo = {
                isLoggedIn: true,
                role: 'customer', // Replace with actual role
                username: 'user@example.com' // Replace with actual email
            };
            login(userInfo);
            navigate('/'); // Redirect to the home page or any other logged-in page
        }
    }, [navigate]);

    const login = (userData) => {
        setUser({ isLoggedIn: true, ...userData });
        Cookies.set('user', JSON.stringify({ isLoggedIn: true, ...userData }));
    };

    const logout = () => {
        setUser({ isLoggedIn: false, role: "", username: "" });
        Cookies.remove('user');
        localStorage.removeItem("token");
        clearCart();
        navigate('/'); // Redirect to the home page or any other logged-out page
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
