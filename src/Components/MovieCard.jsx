import { useState } from "react";

function MovieCard(props)
{
    let poster_prefix = "";

    if(props.movie.poster_path !== "loading...")
    {
        poster_prefix = "https://image.tmdb.org/t/p/w440_and_h660_face";
    }
    
    return (
        <div className="movie-info">
            <img className="movie-poster" src={poster_prefix + props.movie.poster_path}></img>
            <h4>{props.movie.title}</h4>
            <p>{props.movie.release_date.slice(0, 4)}</p>
        </div>
    );
}

export default MovieCard;