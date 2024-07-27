import React, { useState, useContext } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import "./style.css";

function Loginpage() {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { enqueueSnackbar } = useSnackbar();
    const { login } = useContext(AuthContext); // Destructure login from AuthContext

    const changeInputHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.password2) {
            enqueueSnackbar("Passwords do not match", { variant: 'error' });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios.post(
                `${import.meta.env.VITE_BASEURL}/auth/register`,
                {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                },
                config
            );

            enqueueSnackbar("Registration successful", { variant: 'success' });
            navigate("/Login");
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        }
    };

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const changeInputHandler2 = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const submitHandler2 = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, loginData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            login({ username: user.email, role: user.role });

            navigate(user.role === 'admin' ? '/admin' : '/');
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        }
    };

    return (
        <div className="login-page">
            <div className={`container ${isActive ? "active" : ""}`} id="container">
                <div className="form-container sign-up">
                    <form className="register-form" onSubmit={submitHandler}>
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
                            placeholder="Username"
                            name="name"
                            value={userData.name}
                            onChange={changeInputHandler}
                            className="register-input"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userData.email}
                            onChange={changeInputHandler}
                            className="register-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userData.password}
                            onChange={changeInputHandler}
                            className="register-input"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
                            value={userData.password2}
                            onChange={changeInputHandler}
                            className="register-input"
                        />
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form className='form' onSubmit={submitHandler2}>
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
                            placeholder='Email'
                            name="email"
                            value={loginData.email}
                            onChange={changeInputHandler2}
                            className='input'
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={loginData.password}
                            onChange={changeInputHandler2}
                            className='input'
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type='submit' className='button'>Sign In</button>
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
                            <button
                                className="hidden"
                                id="login"
                                onClick={handleLoginClick}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Register with your personal details to use all
                                of the site features
                            </p>
                            <button
                                className="hidden"
                                id="register"
                                onClick={handleRegisterClick}
                            >
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
