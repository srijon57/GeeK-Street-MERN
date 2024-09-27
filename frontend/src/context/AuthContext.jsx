import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const checkTokenExpiration = async () => {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            if (token && refreshToken) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    try {
                        const newAccessToken = await refreshToken();
                        if (newAccessToken) {
                            const userInfo = await axios.get(`${import.meta.env.VITE_BASEURL}/auth/user-info`, {
                                headers: {
                                    Authorization: `Bearer ${newAccessToken}`,
                                },
                            });
                            const userData = {
                                isLoggedIn: true,
                                role: userInfo.data.role,
                                username: userInfo.data.email,
                                id: userInfo.data._id,
                            };
                            login(userData);
                        }
                    } catch (error) {
                        console.error('Error refreshing token:', error);
                        logout();
                    }
                }
            }
        };

        checkTokenExpiration();

        const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes

        return () => clearInterval(interval);
    }, []);

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
                const { accessToken, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                return accessToken;
            } catch (error) {
                console.error('Error refreshing token:', error);
                enqueueSnackbar('Failed to refresh token. Please log in again.', { variant: 'error' });
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
