import React, {useEffect, useRef, useState} from 'react';
import HeroBg from '../assets/images/hero-bg.png'
import Hero from '../assets/images/hero.png'
import Logo from '../assets/images/logo.png'
import Search from "../components/Search.jsx";
import Cart from "../components/Cart.jsx";
import {data} from "../data/data.js";
import {Link} from "react-router-dom";
import Loading from "../components/Loading.jsx";
import {BsArrowLeftCircle, BsArrowRight, BsArrowRightCircle} from "react-icons/bs";


// api key

// const API_BASE_URL="https://api.themoviedb.org/3"
// const API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjNDQwZGMyNjJkMmZlMTBhMjE4OGQwZDZiMWM5OCIsIm5iZiI6MTc1NzE3NDY5My45OTMsInN1YiI6IjY4YmM1YmE1ZmNjNTI2MGVlMDliZmY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuL7KJ2syviF-Vd8u0bysFBK971KVqQW3aHXL5BPiCU";

// const API_OPTION={
//     method:"GET",
//     headers:{
//         accept:"application/json",
//         Authorization:`Bearer ${API_KEY}`
//     }
// }

const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjNDQwZGMyNjJkMmZlMTBhMjE4OGQwZDZiMWM5OCIsIm5iZiI6MTc1NzE3NDY5My45OTMsInN1YiI6IjY4YmM1YmE1ZmNjNTI2MGVlMDliZmY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuL7KJ2syviF-Vd8u0bysFBK971KVqQW3aHXL5BPiCU'
    }
};

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [show, setShow] = useState(1);

    const [movies, setMovies] = useState([])
    const [showLoader, setShowLoader] = useState(false);
    const topRef = useRef(null);
    const fetchMovies = async () => {
        try {
            setLoading(true)
            const endpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${show}&sort_by=popularity.desc`;

            const fetching = await fetch(endpoint, options)

            if (!fetching.ok) {
                throw new Error(`HTTP error! status: ${fetching.status}`);
            }
            const data1 = await fetching.json();
            setMovies(data1.results)
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: "smooth" });
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleShow = () => {
        setShow(show + 1);
    }


    useEffect(() => {
        fetchMovies();
    }, [show])

    useEffect(() => {
        localStorage.removeItem("cartMovies");
        console.log("cartMovies cleared!");
    }, []);

    useEffect(() => {

        if (movies.length > 0) {
            data.push(...movies)
            localStorage.setItem('cartMovies', JSON.stringify(movies));
        }
    }, [movies]);

    // useEffect(() => {
    //     let timer;
    //     if (loading) {
    //         timer = setTimeout(() => setShowLoader(true), 5000);
    //     } else {
    //         setShowLoader(false);
    //     }
    //     return () => clearTimeout(timer);
    // }, [loading]);
    //
    const data1 = movies.filter((movie) => movie['original_title'].toLowerCase().includes(searchTerm.toLowerCase()))
    console.log(data1)
    if (loading && show===1) {
        return <Loading/>;
    }

    return (<>

        <div className="w-full min-h-screen flex justify-center mb-10" style={{
            background: `url('${HeroBg}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="w-full h-full flex  mt-20 items-center flex-col">
                <img src={Logo} alt="" className="max-w-20 mb-20  object-contain"/>
                <img src={Hero} alt="" className="max-w-[500px]  object-contain"/>
                <span className="text-white text-5xl font-bold mt-10 lg:max-w-2/5 max-w-4/5 text-center">
                            Find
                            <span
                                className="bg-linear-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                                Movies </span> You’ll Love Without the Hassle
                        </span>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
        </div>

        <div className="w-11/12 m-auto">
            <div ref={topRef}></div>

            <h1 className="text-white font-bold text-5xl my-3 uppercase">Popular Page {show} </h1>
            {data1.length > 0 ? <Cart movice={searchTerm ? data1 : movies}/> :
                <div className="w-full h-96 flex justify-center items-center text-white text-2xl font-bold">
                    No Movies Found
                </div>}
        </div>

        <div className="w-11/12 px-5 py-6  flex justify-between m-auto group">
            <BsArrowLeftCircle
                className="text-4xl font-bold text-white hover:text-gray-600 cursor-pointer duration-200 transition-all"
                onClick={() => setShow(((prev) => prev - 1))}/>
            <BsArrowRightCircle
                className="text-4xl font-bold text-white hover:text-gray-600 cursor-pointer duration-200 transition-all"
                onClick={() => setShow(((prev) => prev + 1))}/>
        </div>

    </>);
};

export default HomePage;