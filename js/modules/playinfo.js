import Playlist from "./playlist.js";

const PlayInfo = (() => {

    //state object
       const state = {
           songsCount: 0,
           isPlaying: false,
           currentSong: null
       }
   //caching the dom element

   const playerCountEl = document.querySelector('.player__count');
   const songName = document.querySelector('.song__name');
   const playerTrigger = document.querySelector('.player__trigger');
   const playerPrev = document.querySelector('.fa-step-backward');
   const playerNext = document.querySelector('.fa-step-forward');

   //initialize function
    const init = () =>{
        render();
        togglePlayPause();
        playNext();
        playPrev();
    };

    const togglePlayPause = () =>{
        playerTrigger.addEventListener('click', () =>{
            //1.change the state
            state.isPlaying = state.isPlaying ? false : true;
            //2. Render the application
            render();
            //3.Play or pause the song from playlist component 
            Playlist.flip();
        })
    }


    const playNext = () =>{
        playerNext.addEventListener('click', () =>{
            Playlist.playNext();
           
            render();
            
        })
    }

     const playPrev = () =>{
        playerPrev.addEventListener('click', () =>{
            Playlist.playPrev();
             
            render();
        })
    }
    //change state 
    const setState = (obj) =>{
      state.songsCount = obj.songCount;
      state.isPlaying = obj.isPlaying;
      state.currentSong = obj.currentSong;
      render();
    }

    //render function

    const render = () =>{
        playerCountEl.innerHTML = state.songsCount;
        songName.innerHTML = `${state.currentSong.title}`;
        playerTrigger.children[0].className = state.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    return {
        init,
        setState,
        render
      };
})();

export default PlayInfo;