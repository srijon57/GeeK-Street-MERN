import { navItems } from "./Navbari";
import "../CSS/Nav_style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
