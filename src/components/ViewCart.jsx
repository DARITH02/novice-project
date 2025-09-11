import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {FaRegEye, FaStar} from "react-icons/fa";

const ViewCart = () => {
    const {id} = useParams();
    const [viewMovie, setViewMovie] = useState(null);


    useEffect(() => {
        const saved = localStorage.getItem('cartMovies');
        const movies = saved ? JSON.parse(saved) : [];
        // setMovies(movie);
        let found = movies.find((m) => m.id === parseInt(id));
        console.log(movies['id'])
        if (found) {
            setViewMovie(found);
        } else {
            setViewMovie(null); // explicit null if not found
        }
    }, [id]);

    useEffect(() => {
        console.log("Updated viewMovie:", viewMovie);
    }, [viewMovie]);

    if (!viewMovie) {
        return (
            <div className="text-white text-center p-5">
                Movie not found
            </div>
        );
    }

    return (
        <div className="bg-gray-500/10">
            <div className="text-white w-10/12 m-auto px-5 py-5 ">
                <div className="w-full flex justify-between items-center ">
                    <span className="lg:text-2xl text-sm font-bold">
                        {viewMovie.title}
                    </span>

                    <span className="lg:text-xl text-sm px-3 py-2 rounded-md flex gap-2 items-center bg-gray-800">
                        <FaStar className="text-amber-400"/>
                        {viewMovie.vote_average?.toFixed(1)}/10<span className='mr-2'></span>
                        <FaRegEye />
                        {viewMovie.vote_count > 1000
                            ? `${(viewMovie.vote_count / 1000).toFixed(1)}k`
                            : viewMovie.vote_count}
                    </span>
                </div>
            </div>
            <div className="w-10/12 m-auto mt-3 gap-x-3 gap-y-3 grid rounded-md sm:gap-3 lg:grid-cols-[1fr_2fr] md:grid-cols-1 xl:grid-cols-[1fr_2fr] ">
                <div className="w-full h-[430px] rounded-md object-cover ">
                    <img className="w-full h-full rounded-md object-cover" src={`https://image.tmdb.org/t/p/w400/${viewMovie['poster_path']}`}/>
                </div>
                <div className="w-full h-[430px] rounded-md object-cover ">
                    <img className="w-full h-full rounded-md object-cover" src={`https://image.tmdb.org/t/p/w400/${viewMovie['backdrop_path']}`}/>
                </div>
            </div>
            <div className=" w-10/12 m-auto mt-3 gap-x-3 gap-y-3 grid rounded-md sm:gap-3 ">
                <Link to={"/"} className="w-full text-blue-200 text-2xl font-bold py-5">
                    View All Movies
                </Link>
                <table className="w-full rounded-md object-cover ">
                    <tbody>
                    <tr >
                        <td className="text-white text-sm lg:text-2xl  font-bold w-1/6 py-5">Overview</td>
                        <td className="text-white text-sm lg:text-2xl py-5">{viewMovie['overview']}</td>
                    </tr>
                    <tr>
                        <td className="text-white text-sm lg:text-2xl font-bold py-5">Relesase date</td>
                        <td className="text-white text-sm lg:text-2xl py-5">{viewMovie['release_date']}</td>
                    </tr>
                    <tr>
                        <td className="text-white text-sm lg:text-2xl font-bold py-5">Title</td>
                        <td className="text-white text-sm lg:text-2xl py-5">{viewMovie['title']}</td>
                    </tr>
                    <tr>
                        <td className="text-white text-sm lg:text-2xl font-bold py-5">Original language</td>
                        <td className="text-white text-sm lg:text-2xl py-5">{viewMovie['original_language']}</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCart;
