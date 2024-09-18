import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';

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
        const refreshToken = urlParams.get('refreshToken');
        if (token && refreshToken) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
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

        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    enqueueSnackbar('Token expired please log in again', { variant: 'info' });
                    logout();
                }
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [navigate]);

    const login = (userData) => {
        setUser({ isLoggedIn: true, ...userData });
        Cookies.set('user', JSON.stringify({ isLoggedIn: true, ...userData }));
    };

    const logout = () => {
        setUser({ isLoggedIn: false, role: "", username: "", id: "" });
        Cookies.remove('user');
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        clearCart();
        navigate('/'); // Redirect to the home page
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/refresh-token`, { refreshToken });
                const { accessToken } = response.data;
                localStorage.setItem('token', accessToken);
                return accessToken;
            } catch (error) {
                console.error('Error refreshing token:', error);
                logout();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
