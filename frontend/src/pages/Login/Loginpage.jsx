import { useState, useContext } from "react";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../context/AuthContext';
import Spinner from "../../components/Spinner/Spinner";
import "./style.css";

function Loginpage() {
    const [isActive, setIsActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
        setIsRegistered(false);
    };

    const handleLoginClick = () => {
        setIsActive(false);
        setIsRegistered(false);
    };

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const changeInputHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.password2) {
            enqueueSnackbar("Passwords do not match", { variant: 'error' });
            return;
        }

        setLoading(true);

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

            setIsRegistered(true);
            enqueueSnackbar("Registration successful. Please check your email for verification.", { variant: 'success' });
            navigate("/login");
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
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
        setLoading(true);
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, loginData);
            const { token, user } = response.data;
    
            localStorage.setItem('token', token);
            login({ username: user.email, role: user.role, id: user.id });
    
            enqueueSnackbar("Sign in successful", { variant: 'success' });
    
            navigate(user.role === 'admin' ? '/admin' : '/');
        } catch (error) {
            enqueueSnackbar(error.response?.data?.msg || "An error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="login-page">
            <div className={`login-container ${isActive ? "active" : ""}`} id="container">
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
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={userData.password}
                                onChange={changeInputHandler}
                                className="register-input"
                            />
                            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                name="password2"
                                value={userData.password2}
                                onChange={changeInputHandler}
                                className="register-input"
                            />
                            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="register-button">
                            {loading ? <Spinner /> : "Register"}
                        </button>
                        {isRegistered && <p>Please check your email for verification.</p>}
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
                        <div className="password-container">
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                placeholder='Password'
                                name="password"
                                value={loginData.password}
                                onChange={changeInputHandler2}
                                className='input'
                            />
                            <span className="eye-icon" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <a href="/reset-password">Forget Your Password?</a>
                        <button type='submit' className='button'>
                            {loading ? <Spinner /> : "Sign In"}
                        </button>
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
