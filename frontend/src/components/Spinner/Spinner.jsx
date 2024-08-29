import React from "react";
import "./spinner.css";

const Spinner = ({ loading }) => {
    return (
        <div className={`spinner-container ${loading ? 'show' : ''}`}>
            <div className="svg-spinner">
                <div className="container center">
                    <div className="rope center">
                        <div className="legs center">
                            <div className="boot-l"></div>
                            <div className="boot-r"></div>
                        </div>
                        <div className="costume center">
                            <div className="spider">
                                <div className="s1 center"></div>
                                <div className="s2 center"></div>
                                <div className="s3"></div>
                                <div className="s4"></div>
                            </div>
                            <div className="belt center"></div>
                            <div className="hand-r"></div>
                            <div className="hand-l"></div>
                            <div className="neck center"></div>
                            <div className="mask center">
                                <div className="eye-l"></div>
                                <div className="eye-r"></div>
                            </div>
                            <div className="cover center"></div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};

export default Spinner; 
/*
import React from "react";
import "./spinner.css"; 

const Spinner = ({ loading }) => {
    return (
        <div className={`spinner-container ${loading ? 'show' : ''}`}>
            <div className="loader">Loading
                <span></span>
            </div>
        </div>
    );
};

export default Spinner;
*/
