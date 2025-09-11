import React from 'react';
import {IoIosSearch} from "react-icons/io";

const Search = ({searchTerm,setSearchTerm}) => {

    return (
        <>
            <div className="max-w-96 flex justify-center text-white text-2xl font-bold mt-10 items-center  border-1 border-purple-800 px-4 rounded-lg py-1 overflow-hidden">
                <span>
                    <IoIosSearch className="text-purple-400"/>
                </span>
                <input
                    className="w-full h-12 px-4 rounded-full bg-transparent outline-none text-white"
                    type="text"
                    placeholder="Search for movies"
                     value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                      />
            </div>

        </>
    );
};

export default Search;