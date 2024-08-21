import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import './About.css'; // External CSS file

const About = () => {
    const developers = [
        { name: 'KM Hasibur Rahman Srijon', id: '20220104124' },
        { name: 'Zawad Al Mahi', id: '20220104120' },
        { name: 'Sumaiya Islam Daina', id: '20220104115' },
    ];

    return (
        <div className="container">
            <div className="header-container">
                <h1 className="header">About Us</h1>
            </div>
            <div className="content">
                <div className="image-container">
                    <img src="https://images.pexels.com/photos/270640/pexels-photo-270640.jpeg?auto=compress&cs=tinysrgb&w=600" alt="About Us" className="image" loading="lazy" />
                </div>
                <div className="text-container">
                    <p>
                        Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                    </p>
                    <p>
                        Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                    </p>
                </div>
            </div>

            <h2 className="why-choose-us-header">Why Choose Us</h2>
            <div className="why-choose-us-container">
                <div className="why-choose-us-box">
                    <h3>Quality Assurance</h3>
                    <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                </div>
                <div className="why-choose-us-box">
                    <h3>Convenience</h3>
                    <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>
                <div className="why-choose-us-box">
                    <h3>Exceptional Customer Service</h3>
                    <p>Our team of dedicated professionals is here to assist you, ensuring your satisfaction is our top priority.</p>
                </div>
            </div>

            <h2 className="developers-header">Meet the Developers</h2>
            <div className="developer-list">
                {developers.map((developer, index) => (
                    <div key={index} className="developer-card">
                        <h2 className="developer-name">{developer.name}</h2>
                        <p className="developer-id">ID: {developer.id}</p>
                    </div>
                ))}
            </div>

            <div className="social-media">
                <a href="https://www.facebook.com/zawad.almahi.9?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="icon">
                    <FaFacebook size={40} />
                </a>
                <a href="https://www.instagram.com/zawad_al_mahi?igsh=b2x4d2o4OWNkMHA0" target="_blank" rel="noopener noreferrer" className="icon">
                    <FaInstagram size={40} />
                </a>
                <a href="https://maps.app.goo.gl/M7RJ5fLAow3uVTtp9" target="_blank" rel="noopener noreferrer" className="icon">
                    <FaMapMarkerAlt size={40} />
                </a>
            </div>
        </div>
    );
};

export default About;
