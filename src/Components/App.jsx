import { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function App() 
{
    const [clicked, setClicked] = useState(false);
    const [movies, setMovies] = useState([]);
    let movies_arr = [];
    const placeholder = [{title: "loading...", poster_path: "loading...", release_date: "..." }];

    // get all 7 movies
    function get_week_movies() 
    {
      for(let i = 0; i < 7; i++)
      {
        generate_movie();
      }
    }

    function shuffleHandler()
    {
      document.querySelector(".movies").classList.add("animate__backOutDown");
      document.querySelector(".movies").classList.remove("animate__fadeInUp");
 
      movies_arr = [];

      setMovies([]);

      get_week_movies();
        
      setTimeout(() =>
      {
        document.querySelector(".movies").classList.add("animate__fadeInUp");
      }, 1200);     
    }

    // On click, show movies
    document.addEventListener("click", () =>
    {
      if(document.querySelector(".intro-blob"))
      {
        document.querySelector(".intro-blob").classList.add("animate__fadeOutUp");
      }

      get_week_movies();

      setTimeout(() =>
      {
        setClicked(() => 
        {
          return true;
        });
      }, 500);
      
    }, {once: true});

    function random_page()
    {
        return Math.ceil(Math.random() * 500);
    }

    function generate_movie() 
    {
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.REACT_APP_TMDB_API_KEY + "&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=" + random_page() + "&with_watch_monetization_types=flatrate")
        .then((res) => 
        {
            let random_movie = res.data.results[Math.floor(Math.random() * 20)];

            // Sift through movies array, if movie title is already there, don't push movie
            let movie_exists = false;

            if(movies_arr.length !== 0)
            {
              movies_arr.forEach((movie) =>
              {
                if(movie.title === random_movie.title)
                {
                  movie_exists = true;
                }
              });
            }
            
            // if movie doesn't exist, add it
            if(!movie_exists)
            {
              setMovies((prev) =>
              {
                return [...prev, random_movie];
              });

              movies_arr.push(random_movie);
            }
        })
        .catch((err) => 
        {
            console.log(err);
        });
    }
    // console.log("movies array: " + movies_arr);
    return (
      clicked === false?
        <div className="intro-blob animate__animated animate__fadeInUp">
          <h1>
            Discover new films every week. <br />
            Get lost in a flurry of cinema. <br />
            Experience genres you never would've known you liked!
          </h1> 
          <p>Ready, set? Click anywhere to begin your new viewing experience...</p>  
        </div>
      :
        <div className="content animate__animated animate__fadeInUp">
          <h1>Movies? Check. Popcorn? ...Check?</h1>

          {/* {console.log("movies state: " + movies + "\nmovies array: " + movies_arr)} */}

          <div className="movies animate__animated animate__fadeInUp">
            <div>MON <MovieCard movie={movies[0] !== undefined ? movies[0] : placeholder[0]}/></div>
            <div>TUE <MovieCard movie={movies[1] !== undefined ? movies[1] : placeholder[0]}/></div>
            <div>WED <MovieCard movie={movies[2] !== undefined ? movies[2] : placeholder[0]}/></div>
            <div>THU <MovieCard movie={movies[3] !== undefined ? movies[3] : placeholder[0]}/></div>
            <div>FRI <MovieCard movie={movies[4] !== undefined ? movies[4] : placeholder[0]}/></div>
            <div>SAT <MovieCard movie={movies[5] !== undefined ? movies[5] : placeholder[0]}/></div>
            <div>SUN <MovieCard movie={movies[6] !== undefined ? movies[6] : placeholder[0]}/></div>
          </div>

          <p>Not really feeling these movies? That's okay, just give it a good ol' shuffle!</p>
          <button id="shuffle" onClick={shuffleHandler}>Shuffle</button>
        </div>
    );
}

export default App;
