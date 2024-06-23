import React, { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";

const Search = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    // window.addEventListener("scroll", function () {
    //     const navbar = document.querySelector(".nav");
    //     if (window.scrollY > 0) {
    //         navbar.classList.add("sticky");
    //     } else {
    //         navbar.classList.remove("sticky");
    //     }
    // });
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <>
            {" "}
            {searchOpen ? (
                <div className="search-bar active">
                    <input type="text" placeholder="Search..." />
                    <MdClose className="close-icon" onClick={toggleSearch} />
                </div>
            ) : (
                <MdSearch onClick={toggleSearch} />
            )}
        </>
    );
};

export default Search;
