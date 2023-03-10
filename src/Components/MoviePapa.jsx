import { useState, useEffect } from "react";
import axios from "axios";
import MovieMama from "./MovieMama";

function MoviePapa(props)
{
    // array storing our seven films
    const [movies, setMovies] = useState([]);
    const final7 = [];

    // generates a random movie (b/w 0-19) from a random page (b/w 1-500) using the TMDB api
    async function generateMovie() 
    {
        const randomPage = Math.ceil(Math.random() * 500);

        await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.REACT_APP_TMDB_API_KEY + "&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=" + randomPage + "&with_watch_monetization_types=flatrate")
        .then((res) => 
        {
            let randomMovie = res.data.results[Math.floor(Math.random() * 20)];

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
        if(props.shuffled)
        {
            props.setShuffled(false);

            setMovies([]);

            for(let i = 0; i < 7; i++)
            {
                generateMovie();
            }
        }
    }, [props.shuffled]);

    // remove promise from array and only push movie obj
    movies.forEach((movie) =>
    {
        if(movie.title)
        {
            final7.push(movie);
        }
    });

    return (
        final7.length === 7 ? <MovieMama movies={final7} shuffled={props.shuffled} /> : <div className="placeholder"></div>
    );
}

export default MoviePapa;