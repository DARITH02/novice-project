import React, {useEffect, useState} from 'react';
import {FaStar} from "react-icons/fa";

import {Link} from "react-router-dom";

const Cart = ({movice}) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-7 gap-y-10 sm:grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {movice.map((movie, index) => (

                    <Link to={`/view-cart/${movie['id']}`} key={index}
                          className="w-full bg-gray-500/10 h-96 rounded-lg p-6 shadow-lg hover:shadow-2xl hover:bg-gray-400/20 transition-all duration-300 cursor-pointer">
                        <img className="w-full h-10/12 rounded-md object-cover"
                             src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={movie.poster_path}/>
                        <p className="mt-3 truncate whitespace-nowrap text-ellipsis">{movie['original_title']}{movie['id']}</p>
                        <span className=" text-gray-400 flex items-center gap-2 mt-1 text-xl font-bold">
                     <FaStar className="text-amber-400 "/> {movie['popularity'].toFixed(1)}</span>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Cart;
