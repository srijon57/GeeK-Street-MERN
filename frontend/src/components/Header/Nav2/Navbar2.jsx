import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import "./Navbar_style.css";
import CartIcon from '../../Cart/CartIcon';
import { AuthContext } from '../../../context/AuthContext.jsx'; 

const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
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
                    <div>
                        <Link to="/cart"><CartIcon /></Link>
                    </div>
                    <div>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                    <div id="ham" className="hamburger" onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar2;
