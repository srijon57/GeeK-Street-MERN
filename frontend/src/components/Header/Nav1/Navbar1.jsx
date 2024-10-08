import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose, MdWbSunny, MdNightsStay,MdHistory } from "react-icons/md";
import "./Navbar_style.css";
import CartIcon from "../../Cart/CartIcon";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { ThemeContext } from "../../Theme/Theme";
const Navbar1 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Admin", href: "/admin" },
        { name: "Dashboard", href: "/admin/admindashboard" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="nav">
            <div className="nav-logo">GEEK STREET BD</div>
            <ul className={`nav-ul ${isOpen ? "active" : ""}`}>
                {navItems.map((item, idx) => (
                    <li key={idx} className="nav-item">
                        <Link to={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="Right">
                <ul className="Righter">
                    <li className="nav-item theme-toggle" onClick={toggleTheme}>
                        {theme === "dark" ? <MdWbSunny /> : <MdNightsStay />}
                    </li>
                    <div className="NavHistory">
                        <Link to="/orderhistory">
                            <MdHistory /> 
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">
                            <CartIcon />
                        </Link>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </div>
                    <div id="ham" className="hamburger" onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar1;
