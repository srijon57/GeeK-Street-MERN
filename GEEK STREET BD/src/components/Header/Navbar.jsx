import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdSearch, MdMenu, MdClose } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import "./Navbar_style.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".nav");
        if (window.scrollY > 0) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
        { name: "Login/Signup", href: "/Login" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
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
                        {searchOpen ? (
                            <div className="search-bar active">
                                <input type="text" placeholder="Search..." />
                                <MdClose className="close-icon" onClick={toggleSearch} />
                            </div>
                        ) : (
                            <MdSearch onClick={toggleSearch} />
                        )}
                    </div>
                    <div>
                        <GiCharacter />
                    </div>
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
