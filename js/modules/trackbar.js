const Trackbar = (() => {
     const state = {
         currTrackTime: 0,
         fullTrackTime: 0,
         fullWidth: 0
     }
     const init = () =>{
         render();
         
     }

     //caching the dom element
     const trackBarFill = document.querySelector('.track-bar__fill')

     const render = () => {
         trackBarFill.style.width = `${state.fullWidth}%`
     }

     const setState = (obj) => {
        state.currTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fullWidth = (state.currTrackTime / state.fullTrackTime) * 100;
        render();
     }
     return { init, setState };
})()

export default Trackbar