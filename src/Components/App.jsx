import { useState } from "react";
import MoviePapa from "./MoviePapa";

function App() 
{
    // state managing if user has been in the page for 4 secs
    const [landedStatus, setLandedStatus] = useState(false);
    const [shuffled, setShuffled] = useState(true);

    // Display intro blob for 4 secs, then movie recommendations  
    setTimeout(() => 
    {
      if(document.querySelector(".intro-blob"))
      {
        document.querySelector(".intro-blob").classList.add("animate__fadeOutUp");
      }
      
      setTimeout(() =>
      {
          setLandedStatus(true);
        }, 600);   
    }, 4000);

    function handleShuffle()
    {
      setShuffled(true);
    }

    return (
      landedStatus === false?
        <div className="intro-blob animate__animated animate__fadeInUp">
          <h1>
            Discover new films every week. <br />
            Get lost in a flurry of cinema. <br />
            Experience genres you never would've known you liked!
          </h1> 
          <p>Ready, set? Let's begin your new viewing experience!</p>  
        </div>
      :
      <div className="content animate__animated animate__fadeInUp">
            <h1>Movies? Check. Popcorn? ...Check?</h1>

            <MoviePapa 
              shuffled={shuffled} 
              setShuffled={setShuffled}
            />
            
            <p>Not really feeling these movies? That's okay, just give it a good ol' shuffle!</p>

            <button id="shuffle" onClick={handleShuffle}>Shuffle</button>
      </div>
        
    );
}

export default App;