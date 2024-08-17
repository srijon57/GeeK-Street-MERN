import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        role: "",
        username: ""
    });

    const { clearCart } = useCart(); 

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser({ isLoggedIn: true, ...userData });
        Cookies.set('user', JSON.stringify({ isLoggedIn: true, ...userData }));
    };

    const logout = () => {
        setUser({ isLoggedIn: false, role: "", username: "" });
        Cookies.remove('user');
        localStorage.removeItem("token");
        clearCart();
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
