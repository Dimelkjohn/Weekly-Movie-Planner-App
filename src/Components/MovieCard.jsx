function MovieCard(props)
{
    const poster_prefix = "https://image.tmdb.org/t/p/w440_and_h660_face";
    
    return (
        <div className="movie-card">
            <img className="movie-poster" src={poster_prefix + props.movie.poster_path} alt="random recommended movie"></img>
            <h4>{props.movie.title}</h4>
            <p>{props.movie.release_date.slice(0, 4)}</p>
        </div>
    );
}

export default MovieCard;