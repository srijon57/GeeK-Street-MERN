// import { navItems } from "./Navbari";
import { Link } from "react-router-dom";
import "./Navbar_style.css"

const Navbar = () => {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/About" },
        { name: "Login/Signup", href: "/Login" },
        { name: "Profile", href: "/Profile" }
    ];

    return (
        <nav className="nav">
            <div className="nav-logo">GEEK STREED BD</div>
            <ul className="nav-ul">
                {navItems.map((item, idx) => (
                    <li key={idx} className="nav-item">
                        <Link to={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
