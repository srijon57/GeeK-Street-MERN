import React from "react";
import "./Footer.css";

const Footer=()=>{
    return (
        <div className="footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links"> 
                    <div className="sb_footer-links-div">
                        <h4>Office</h4>
                        <p>UlonRoad,Rampura</p>
                        <p>Dhaka-1215</p>
                        <p>contact-01715789302</p>
                        <p>geekstreetbd@gmail.com</p>

                    </div>
                    <div className="sb_footer-links_div">
                        <h4>About Us</h4>
                        <p>Online Delivery</p>
                        <p>Refund & return Policy</p>
                        <p>Brands</p>

                    </div>
                    <div className="sb_footer-below">
                        <div className="sb_footer-copyright"> 
                            <p>
                                @{new Date().getFullYear()}|All rights reserverd|Terms and Conditions
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    
    )
}
export default Footer;
