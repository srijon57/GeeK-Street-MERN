import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdMenu, MdClose, MdSearch } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import "./Navbar_style.css";
import CartIcon from '../Cart/CartIcon';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false); // State for search bar

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
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
                        <Link to="/cart"><CartIcon/></Link>
                    </div>
                    <div id="ham" className="hamburger" onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
