import React, { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import "./search_style.css";

const Search = ({ onSearch }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); 
    };

    return (
        <div className="search-container">
            {/* {searchOpen ? ( */}
                <div className="search-bar active">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* <MdClose className="close-icon" onClick={toggleSearch} /> */}
                </div>
            {/* ) : (
                <MdSearch className="search-icon" onClick={toggleSearch} />
            )} */}
        </div>
    );
};

export default Search;
