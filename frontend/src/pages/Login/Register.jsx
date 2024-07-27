import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Register = ({ signUpData, handleSignUpChange, handleSignUpSubmit }) => {
    return (
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
    );
};

export default Register;
