
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./spinner.css"; // Import the CSS file for styling

const Spinner = ({ loading }) => {
    return (
        <div className={`spinner-container ${loading ? 'show' : ''}`}>
            <ClipLoader color={"#123abc"} loading={loading} size={150} />
        </div>
    );
};

export default Spinner;
