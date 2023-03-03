// import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieMama(props)
{
    return (
        <div className="movies">
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>MON <MovieCard movie={props.movies[0]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>TUE <MovieCard movie={props.movies[1]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>WED <MovieCard movie={props.movies[2]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>THU <MovieCard movie={props.movies[3]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>FRI <MovieCard movie={props.movies[4]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>SAT <MovieCard movie={props.movies[5]} /></div>
            <div className= {props.shuffled ? "animate__animated animate__fadeOutUp" : "animate__animated animate__fadeInUp"}>SUN <MovieCard movie={props.movies[6]} /></div>
        </div>
    );
}

export default MovieMama;