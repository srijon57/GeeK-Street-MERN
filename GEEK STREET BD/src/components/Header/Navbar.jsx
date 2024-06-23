import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";
//import { GiCharacter } from "react-icons/gi";
import Search from "../search/search";
import "./Navbar_style.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
        { name: "Login/Signup", href: "/Login" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav">
            <div className="nav-logo">GEEK STREED BD</div>
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
                        <Search />
                    </div>
                    {/* <div>
                        <GiCharacter />
                    </div> */}
                    <div>
                        <MdOutlineShoppingCart />
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
