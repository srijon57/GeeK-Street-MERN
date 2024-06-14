import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
    const developers = [
        { name: 'KM Hasibur Rahman Srijon', id: '20220104124' },
        { name: 'Zawad Al Mahi', id: '20220104120' },
        { name: 'Sumaiya Islam Daina', id: '20220104115' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>About the Developers</h1>
            </div>
            <p style={styles.intro}>
                Meet the dedicated team behind this application. Each member brings unique skills and expertise to the table, contributing to our success.
            </p>
            <div style={styles.developerList}>
                {developers.map((developer, index) => (
                    <div key={index} style={styles.developerCard}>
                        <h2 style={styles.developerName}>{developer.name}</h2>
                        <p style={styles.developerId}>ID: {developer.id}</p>
                    </div>
                ))}
            </div>
            <div style={styles.socialMedia}>
                <a href="https://www.facebook.com/zawad.almahi.9?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                    <FaFacebook size={40} />
                </a>
                <a href="https://www.instagram.com/zawad_al_mahi?igsh=b2x4d2o4OWNkMHA0" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                    <FaInstagram size={40} />
                </a>
                <a href="https://maps.app.goo.gl/M7RJ5fLAow3uVTtp9" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                    <FaMapMarkerAlt size={40} />
                </a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px 20px',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Helvetica, Arial, sans-serif',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    headerContainer: {
        backgroundImage: 'url("https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?cs=srgb&dl=pexels-katja-79053-592077.jpg&fm=jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    header: {
        fontSize: '3em',
        marginBottom: '20px',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'inline-block',
        padding: '10px 20px',
        borderRadius: '8px',
    },
    intro: {
        fontSize: '1.4em',
        marginBottom: '40px',
        color: '#666',
    },
    developerList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    developerCard: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        width: '80%',
        maxWidth: '500px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    developerName: {
        fontSize: '1.8em',
        margin: '0 0 10px 0',
        color: '#007BFF',
        fontStyle: 'italic',
    },
    developerId: {
        fontSize: '1.2em',
        color: '#888',
    },
    socialMedia: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    icon: {
        color: '#2c3e50',
        transition: 'color 0.3s',
    },
    iconHover: {
        color: '#007BFF',
    },
};

export default About;