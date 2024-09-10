import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        role: "",
        username: "",
        id: ""
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
            axios
                .get(`${import.meta.env.VITE_BASEURL}/auth/user-info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userInfo = {
                        isLoggedIn: true,
                        role: response.data.role,
                        username: response.data.email,
                        id: response.data._id, 
                    };
                    login(userInfo);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [navigate]);

    const login = (userData) => {
        setUser({ isLoggedIn: true, ...userData });
        Cookies.set('user', JSON.stringify({ isLoggedIn: true, ...userData }));
    };

    const logout = () => {
        setUser({ isLoggedIn: false, role: "", username: "", id: "" });
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
