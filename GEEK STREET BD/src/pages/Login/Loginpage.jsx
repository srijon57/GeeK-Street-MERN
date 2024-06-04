import React, { useEffect } from "react";
import "./style.css";

function LoginLoginpage() {
    useEffect(() => {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");

        const addRightPanelActive = () => container.classList.add("right-panel-active");
        const removeRightPanelActive = () => container.classList.remove("right-panel-active");

        signUpButton.addEventListener("click", addRightPanelActive);
        signInButton.addEventListener("click", removeRightPanelActive);

        // Cleanup event listeners on component unmount
        return () => {
            signUpButton.removeEventListener("click", addRightPanelActive);
            signInButton.removeEventListener("click", removeRightPanelActive);
        };
    }, []);

    return (
        <div
            className="container"
            id="container"
            style={{ paddingTop: "60px" }}
        >
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social">
                            <i className="fab fa-facebook" />
                        </a>
                        <a href="#" className="social">
                            <i className="fab fa-linkedin" />
                        </a>
                        <a href="#" className="social">
                            <i className="fab fa-instagram" />
                        </a>
                    </div>
                    <span>Create an account for free </span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign In</h1>
                    <div className="social-container">
                        <a href="#" className="social">
                            <i className="fab fa-facebook" />
                        </a>
                        <a href="#" className="social">
                            <i className="fab fa-linkedin" />
                        </a>
                        <a href="#" className="social">
                            <i className="fab fa-instagram" />
                        </a>
                    </div>
                    <span>Already have account ? </span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back</h1>
                        <p>
                            If you already have account please login to keep
                            connected with us
                        </p>
                        <button className="ghost" id="signIn">
                            Sign In
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello Friend</h1>
                        <p>
                            Don`t have account ? Please sign up with your
                            personal details to connect with us !{" "}
                        </p>
                        <button className="ghost" id="signUp">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLoginpage;
