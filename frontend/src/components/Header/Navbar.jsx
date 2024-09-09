import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose, MdWbSunny, MdNightsStay } from "react-icons/md";
import "./Navbar_style.css";
import Image1 from "../../../public/G.png";
import { ThemeContext } from "../Theme/Theme"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/About" },
        { name: "Review", href: "/review" },
        { name: "SignUp/SignIn", href: "/Login" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src={Image1} alt="G" className="nav-logo-image" />
                <span>EEK STREET BD</span>
            </div>
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

                    <div id="ham" className="hamburger" onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
