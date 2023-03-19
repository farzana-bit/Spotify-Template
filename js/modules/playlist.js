import songsList from "../data/songs.js";
import PlayInfo from "./playinfo.js";
import Trackbar from "./trackbar.js";


const Playlist = (() => {
     //state control variable
    const songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);
    let isPlaying = false;


     //caching the dom element
    const playlistElem = document.querySelector('.playlist');

      const init = () => {
          render();
          listeners();
      };

      const togglePlayPause = () => {
        //   if(currentSong.pause()){
        //       currentSong.play();
        //   }else{
        //       currentSong.pause();
        //   }
        
        return currentSong.paused ? currentSong.play() : currentSong.pause();
      }

      const mainPlay = (index) => {
          if(index == currentlyPlayingIndex){
             //toggle play and pause
             togglePlayPause();
           isPlaying =  currentSong.paused ? false : true;

          }else {
              
              //change the currentlyPlayingIndex
              //pause the previous song if it is playing
              //playing the new song

              currentlyPlayingIndex = index;
              currentSong.src = songs[currentlyPlayingIndex].url;
              togglePlayPause();
              isPlaying =  currentSong.paused ? false : true;
          }
      }

     const flip = () => {
         togglePlayPause();
         render();
     };

     const playNext = () => {
         if(songs[currentlyPlayingIndex + 1]){
         currentlyPlayingIndex++; 
         currentSong.src = songs[currentlyPlayingIndex].url;
         togglePlayPause();
         isPlaying = true;
         render();
         PlayInfo.setState ({
                    songCount: songs.length,
                    currentSong: songs[currentlyPlayingIndex],
                    isPlaying:isPlaying
                });
                
         }
     };

     const playPrev = () => {
         if(songs[currentlyPlayingIndex - 1]){
         currentlyPlayingIndex--; 
         currentSong.src = songs[currentlyPlayingIndex].url;
         togglePlayPause();
         isPlaying = true;
         render();
         PlayInfo.setState ({
                    songCount: songs.length,
                    currentSong: songs[currentlyPlayingIndex],
                    isPlaying:isPlaying
                });
                
         }
     };

     const listeners = () => {
         //1.get the index of the li tag
         //2.change the currentlyPlayingIndex to the index of the li tag
         //3.change the icon of play and pause
         //4.play or pause the songs
         //5.if it's not the same song , then change the song url to the currently playing songs
         //6. pause the currently playing song and play the currently selected songs
         playlistElem.addEventListener('click', (event) => {
             if(event.target.matches('.fa')){
                 const listEl = event.target.parentNode.parentNode;
                 const clickedIndex = [...listEl.parentNode.children].indexOf(listEl);
                 mainPlay(clickedIndex);
                 render();   
                 PlayInfo.setState ({
                    songCount: songs.length,
                    isPlaying: isPlaying,
                    currentSong: songs[currentlyPlayingIndex]
                });

             }
         });
         currentSong.addEventListener('timeupdate', () => {
            Trackbar.setState(currentSong)
         });
     }

     PlayInfo.setState ({
         songCount: songs.length,
         isPlaying: isPlaying,
         currentSong: songs[currentlyPlayingIndex]
     });



       
      
      const render = () => {
          let markup = '';

          const toggleIcon = (index) => {
              if(currentlyPlayingIndex == index){
                  return currentSong.paused ? 'fa-play' : 'fa-pause';
              }else{
                  return 'fa-play';
              }
          };

          songs.forEach((song, index) => {
              markup += `
                         <li class="playlist__song ${index == currentlyPlayingIndex ? 'playlist__song--active': ''}">
                                <div class="play-pause">
                                    <i class="fa ${toggleIcon(index)} pp-icon"></i>
                                </div>
                                <div class="playlist__song-details">
                                    <span class="playlist__song-name"
                                        >${song.title}</span
                                    >
                                    <span class="playlist__song-artist"
                                        >${song.artist}</span
                                    >
                                </div>
                                <div class="playlist__song-duration">${song.time}</div>
                            </li>
              `
          });

          playlistElem.innerHTML = markup;
      }

      return {
          init,
          flip,
          playNext,
          playPrev
         
      }
})();

export default Playlist;