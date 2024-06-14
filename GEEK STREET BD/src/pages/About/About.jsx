import React from 'react';

const About = () => {
    const developers = [
        { name: 'KM Hasibur Rahman Srijon', id: '20220104124' },
        { name: 'Zawad Al Mahi', id: '20220104120' },
        { name: 'Sumaiya Islam Daina', id: '20220104115' },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About the Developers</h1>
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
    header: {
        fontSize: '3em',
        marginBottom: '20px',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif',
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
};

export default About;
