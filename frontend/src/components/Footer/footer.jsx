// import React from "react";
import "./footer_style.css";
import {
    FaFacebookF,
    FaInstagram,
    FaRegEnvelope,
    FaArrowRight,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

const Footer = () => {
    return (
        <footer>
            <div className="wave-container">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="row">
                <div className="col">
                    {/* <img src="logo.png" className="logo" alt="Logo" /> */}
                    <h3>
                        <div className="Fot-logo">GEEK STREED BD</div>
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <p>
                        Experience the great technology with us every time.
                        Unlock new possibilities and elevate your digital
                        journey. Join us to innovate and transform your world.
                        Together, we`ll shape the future of technology.
                    </p>
                </div>
                <div className="col">
                    <h3>
                        Office{" "}
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <p>
                        Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura
                        Square, Dhaka 1000
                    </p>
                    <p className="email-id">aust123@gmail.com</p>
                    <h4>+88-0123456789</h4>
                </div>
                <div className="col">
                    <h3>
                        Links{" "}
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/shop">Shop</a>
                        </li>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <h3>
                        Latest News{" "}
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <form>
                        <a href="/news">News</a>
                    </form>
                    <h3>
                        Connect with us{" "}
                        <div className="underline">
                            <span></span>
                        </div>
                    </h3>
                    <ul className="social_icon">
                        <li>
                            <a href="https://www.facebook.com/zawad.almahi.9?mibextid=ZbWKwL">
                                <FaFacebookF />
                            </a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/M7RJ5fLAow3uVTtp9">
                                <HiLocationMarker />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/zawad_al_mahi?igsh=b2x4d2o4OWNkMHA0">
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="copyright">
                CSE2200 C1 @Team_4 2024 - All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
