import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Login = ({ signInData, handleSignInChange, handleSignInSubmit }) => {
    return (
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
    );
};

export default Login;
