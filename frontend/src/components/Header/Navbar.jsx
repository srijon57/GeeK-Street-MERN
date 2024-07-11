import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import Search from "../search/search";
import "./Navbar_style.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: "Unknown"
    });

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
        { name: user.isLoggedIn ? "Profile" : "Login/Signup", href: user.isLoggedIn ? "#" : "/Login" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        // Handle logout logic
        setUser({ isLoggedIn: false, username: "" });
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
                        <Search />
                    </div>
                    <div>
                        <MdOutlineShoppingCart />
                    </div>
                    {user.isLoggedIn && (
                        <div className="profile-menu">
                            <GiCharacter onClick={toggleProfileMenu} />
                            {isProfileOpen && (
                                <div className="dropdown">
                                    <p>{user.username}</p>
                                    <Link to="/edit-profile">Edit Profile</Link>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                    <div id="ham" className="hamburger" onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
