import React, { useEffect, useState } from "react";
import a from "./a.jfif";
import b from "./b.jfif";
import c from "./c.jfif";
import d from "./a.jfif";
import "./Home.css";
import Hero from "../../components/Hero/Hero";

export const Homepage = () => {
    const [src, setSrc] = useState(a);
    const [index, setIndex] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const photo = [a, b, c, d];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % photo.length);
            setSrc(photo[index]);
        }, 5000); // Change the interval time (in milliseconds) as needed

        return () => clearInterval(interval);
    }, [index, photo]);

    return (
        <div>
            <div>
                <Hero />
            </div>
            
            <div className="shop-by-catagory">
                <div className="title-line">
                    <div className="line"></div>
                    <div className="title">SHOP BY CATAGORY</div>
                    <div className="line"></div>
                </div>
                <div className="shop-row">
                    <div className="desktop">
                        <img src={a} alt="" />
                        <button>Desktop</button>
                    </div>
                    <div className="laptop">
                        <img src={b} alt="" />
                        <button>Laptop</button>
                    </div>
                    <div className="components">
                        <img src={c} alt="" />
                        <button>Components</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
