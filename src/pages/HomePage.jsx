import React, { useEffect, useRef, useState } from 'react';
import HeroBg from '../assets/images/hero-bg.png';
import Hero from '../assets/images/hero.png';
import Logo from '../assets/images/logo.png';
import Search from '../components/Search.jsx';
import Cart from '../components/Cart.jsx';
import Loading from '../components/Loading.jsx';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjNDQwZGMyNjJkMmZlMTBhMjE4OGQwZDZiMWM5OCIsIm5iZiI6MTc1NzE3NDY5My45OTMsInN1YiI6IjY4YmM1YmE1ZmNjNTI2MGVlMDliZmY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuL7KJ2syviF-Vd8u0bysFBK971KVqQW3aHXL5BPiCU',
    },
};

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const topRef = useRef(null);

    // ✅ page comes from URL query
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const [page, setPage] = useState(pageFromUrl);

    // 📝 update URL when page changes
    useEffect(() => {
        setSearchParams({ page });
    }, [page, setSearchParams]);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const endpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setMovies(data.results || []);

            localStorage.setItem('cartMovies', JSON.stringify(data.results || []));

            setTimeout(() => {
                topRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const filteredMovies = movies.filter(movie =>
        movie.original_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <>
            {page ===1 && <div ref={topRef}></div>}
            <div
                className="w-full min-h-screen flex justify-center mb-10"
                style={{
                    background: `url('${HeroBg}')`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="w-full h-full flex mt-20 items-center flex-col">
                    <img src={Logo} alt="Logo" className="max-w-20 mb-20 object-contain" />
                    <img src={Hero} alt="Hero" className="max-w-[500px] object-contain" />
                    <span className="text-white text-5xl font-bold mt-10 lg:max-w-2/5 max-w-4/5 text-center">
                        Find <span className="bg-linear-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Movies</span> You’ll Love Without the Hassle
                    </span>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
            </div>
            {page > 1 && <div ref={topRef}></div>}
            <div className="w-11/12 m-auto">
                <h1 className="text-white font-bold text-5xl my-3 uppercase">
                    Popular Page {page}
                </h1>

                {filteredMovies.length > 0 ? (
                    <Cart movice={filteredMovies} />
                ) : (
                    <div className="w-full h-96 flex justify-center items-center text-white text-2xl font-bold">
                        No Movies Found
                    </div>
                )}
            </div>

            <div className="w-11/12 px-5 py-6 flex justify-between m-auto">
                <BsArrowLeftCircle
                    className="text-4xl font-bold text-white hover:text-gray-600 cursor-pointer transition-all"
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                />
                <BsArrowRightCircle
                    className="text-4xl font-bold text-white hover:text-gray-600 cursor-pointer transition-all"
                    onClick={() => setPage(prev => prev + 1)}
                />
            </div>
        </>
    );
};

export default HomePage;
