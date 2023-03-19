import songsList from '../data/songs.js'; 

const Playlist = (() => {
    const songs = songsList;
    const currentlyPlayingIndex = 0;
    const currentSong = new Audio(songs[currentlyPlayingIndex].url);
    const isPlaying = false;


    const init = () => {
        console.log('hello from spotify');
        console.log(songs);
        
    };

    return {
        init
    };
})();

export default Playlist;