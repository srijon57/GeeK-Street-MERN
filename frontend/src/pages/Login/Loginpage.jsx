import React, { useState } from "react";
import axios from 'axios';
import "./style.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Loginpage() {
    const [isActive, setIsActive] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`http://localhost:8080/signup`, signUpData);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('There was an error registering!');
            console.error('There was an error registering!', error);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`http://localhost:8080/signin`, signInData);
            console.log(response.data);
            setLoading(false);
            navigate('/'); // Redirect to homepage
        } catch (error) {
            setLoading(false);
            setError('There was an error logging in!');
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div className="login-page">
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            <div className={`container ${isActive ? "active" : ""}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <FaGoogle />
                            </a>
                            <a href="#" className="icon">
                                <FaFacebookF />
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={signUpData.name}
                            onChange={handleSignUpChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <FaGoogle />
                            </a>
                            <a href="#" className="icon">
                                <FaFacebookF />
                            </a>
                        </div>
                        <span>or use your email for password</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={handleSignInChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signInData.password}
                            onChange={handleSignInChange}
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                Enter your personal details to use all of the
                                site features
                            </p>
                            <button className="hidden" id="login" onClick={handleLoginClick}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Register with your personal details to use all
                                of the site features
                            </p>
                            <button className="hidden" id="register" onClick={handleRegisterClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
