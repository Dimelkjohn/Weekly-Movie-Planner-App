import { useState, useEffect } from "react";
import axios from "axios";
import MovieMama from "./MovieMama";

function MoviePapa(props)
{
    // array storing our seven films
    const [movies, setMovies] = useState([]);
    const [shuffled, setShuffled] = useState(true);
    const [play_animation, setPlay_animation] = useState(true);
    const final7 = [];

    function handleShuffle()
    {
      setShuffled(true);
    }

    // generates a random movie (b/w 0-19) from a random page (b/w 1-500) using the TMDB api
    async function generateMovie() 
    {
        const randomPage = 1; //Math.ceil(Math.random() * 500);
        let randomMovie = {title: "", release_date: "", poster_path: ""};

        await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.REACT_APP_TMDB_API_KEY + "&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=" + randomPage + "&with_watch_monetization_types=flatrate")
        .then((res) => 
        {
            randomMovie = res.data.results[Math.floor(Math.random() * 20)];

            setMovies((prev) =>
            {
                const prev_movies = prev.map((movie) => 
                {
                    return movie.title;
                });

                if(prev_movies.includes(randomMovie.title))
                {                    
                    return [...prev, generateMovie()];
                }
                else
                {
                    return [...prev, randomMovie];
                }
            });
        })
        .catch((err) =>
        {
            console.log("Axios generate movie error: " + err);
        });
    }

    // Generate movies once upon initial render
    useEffect(() =>
    {
        // clear current movies and generate new 7 movies
        if(shuffled)
        {
            setTimeout(() =>
            {
                setShuffled(false);

                setMovies([]);

                for(let i = 0; i < 7; i++)
                {
                    generateMovie();
                }
            }, 1000);  
        }
    }, [shuffled]);

    // remove promise from array and only push movie obj
    movies.forEach((movie) =>
    {
        if(movie.title)
        {
            final7.push(movie);
        }
    });

    return (
        final7.length === 7 && 
        <div className={play_animation ? "content animate__animated animate__fadeInUp" : "content"}>
            <h1>Movies? Check. Popcorn? ...Check?</h1>

            <MovieMama movies={final7} shuffled={shuffled} />
            
            <p>Not really feeling these movies? That's okay, just give it a good ol' shuffle!</p>

            <button id="shuffle" onClick={handleShuffle}>Shuffle</button>
        </div>
    );
}

export default MoviePapa;