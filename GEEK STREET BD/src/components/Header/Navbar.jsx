import { Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import "./Navbar_style.css";

const Navbar = () => {
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
            <div className="Right">
                <ul className="Righter">
                    <div>
                        <MdSearch />
                    </div>
                    <div>
                        <GiCharacter />
                    </div>
                    <div>
                        <MdOutlineShoppingCart />
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
