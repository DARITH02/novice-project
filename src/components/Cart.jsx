import React, {useEffect} from 'react';
import { FaStar} from "react-icons/fa";

const Cart = ({movice}) => {

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="grid grid-cols-4 gap-7 gap-y-10 text-white">
                {movice.map((movie,index)=>(
                <div key={index} className="w-full bg-gray-500/10 h-80 rounded-lg p-6 shadow-lg">
                  <img className="w-full h-10/12 rounded-md object-cover" src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={movie.poster_path}/>
                    <p className="mt-3">{movie['original_title']}</p>
                    <span className=" text-gray-400 flex items-center gap-2 mt-1 text-xl font-bold">
                     <FaStar  className="text-amber-400 " /> {movie['popularity'].toFixed(1)}</span>
                </div>
                ))}
            </div>
        </>
    );
};

export default Cart;