import React, {useEffect, useState} from 'react';
import HeroBg from '../assets/images/hero-bg.png'
import Hero from '../assets/images/hero.png'
import Logo from '../assets/images/logo.png'
import Search from "../components/Search.jsx";
import Cart from "../components/Cart.jsx";


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
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjNDQwZGMyNjJkMmZlMTBhMjE4OGQwZDZiMWM5OCIsIm5iZiI6MTc1NzE3NDY5My45OTMsInN1YiI6IjY4YmM1YmE1ZmNjNTI2MGVlMDliZmY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuL7KJ2syviF-Vd8u0bysFBK971KVqQW3aHXL5BPiCU'
    }
};

const HomePage = () => {

    const [searchTerm,setSearchTerm]=useState("")
    const [movies,setMovies]=useState([])

    const fetchMovies=async ()=>{
            try{
                const endpoint="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=37&sort_by=popularity.desc";

               const fetching = await  fetch(endpoint, options)

                if (!fetching.ok) {
                    throw new Error(`HTTP error! status: ${fetching.status}`);
                }
                const data=await fetching.json();
                setMovies(data.results)
                 }catch (error){
                console.log(error)
            }
    }

    console.log(searchTerm)

    useEffect(()=> {
        fetchMovies();
    },[setMovies])

    const data= movies.filter((movie)=>movie['original_title'].toLowerCase().includes(searchTerm.toLowerCase()))

    console.log(data)


    useEffect(() => {
    }, []);
    return (
        <>
            <div className="w-full min-h-screen flex justify-center mb-10" style={{background:`url('${HeroBg}')`,backgroundSize:"100% 100%",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
                    <div className="w-full h-full flex  mt-20 items-center flex-col">
                        <img src={Logo} alt="" className="w-20 mb-20  object-contain" />
                        <img src={Hero} alt="" className="w-[500px]  object-contain" />
                        <span className="text-white text-5xl font-bold mt-10 w-2/5 text-center">
                            Find
                            <span className="bg-linear-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent ">
                                Movies </span> You’ll Love Without the Hassle
                        </span>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
            </div>

            <div className="w-11/12 m-auto">
                <h1 className="text-white font-bold text-5xl my-3 uppercase">Popular</h1>
                <Cart movice={movies}/>
            </div>

        </>
    );
};

export default HomePage;