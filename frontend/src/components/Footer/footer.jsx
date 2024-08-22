import React from "react";
import "./footer_style.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-wave-container">
                <div className="footer-wave" id="wave1"></div>
                <div className="footer-wave" id="wave2"></div>
                <div className="footer-wave" id="wave3"></div>
                <div className="footer-wave" id="wave4"></div>
            </div>
            <div className="footer-row">
                <div className="footer-col">
                    <h3>
                        <div className="footer-logo">GEEK STREED BD</div>
                        <div className="footer-underline">
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
                <div className="footer-col">
                    <h3>
                        Office{" "}
                        <div className="footer-underline">
                            <span></span>
                        </div>
                    </h3>
                    <p>
                    141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208, Bangladesh
                    </p>
                    <p className="footer-email-id">aust123@gmail.com</p>
                    <h4>+880-123456789</h4>
                </div>
                <div className="footer-col">
                    <h3>
                        Links{" "}
                        <div className="footer-underline">
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
                        <li>
                            <a href="/review">Review</a>
                        </li>
                        <li>
                            <a href="/report">Send Us a report</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>
                        Latest News{" "}
                        <div className="footer-underline">
                            <span></span>
                        </div>
                    </h3>
                    <div className="news-link">
                        <a href="/news">News</a>
                    </div>
                    <h3>
                        Connect with us{" "}
                        <div className="footer-underline">
                            <span></span>
                        </div>
                    </h3>
                    <ul className="footer-social-icon">
                        <li>
                            <a href="https://www.facebook.com/zawad.almahi.9?mibextid=ZbWKwL">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/M7RJ5fLAow3uVTtp9">
                                Google-Maps
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/zawad_al_mahi?igsh=b2x4d2o4OWNkMHA0">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                CSE2200 C1 @Team_4 2024 - All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
