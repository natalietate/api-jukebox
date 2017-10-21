// for security purposes, everything lives inside of this function
(function(ENV) {

//initialize soundcloud
  const client_id = ENV.client_id;
  SC.initialize({
    client_id: client_id
  });

  // set current track to 0
  trNum = 0

  // get songs from SC
  SC.get('/tracks', {
    q: 'summer',
  }).then(function(tracks) {
    // console.log(tracks);

    // song playback
    SC.stream('/tracks/' + tracks[trNum].id).then(function(player) {

      function playSong() {
        player.play()
        setInfo();
      }

      function pauseSong() {
        player.pause()
      }

      function nextSong() {
        trNum++
        SC.stream('/tracks/' + tracks[trNum].id).then(function(player) {
          // console.log(tracks[trNum].id)
          setInfo();
          player.play();
          pause.addEventListener('click', function() {
            player.pause()
          });
        });
      }
      
      // to be displayed with each song (I know, this is super clunky)
      function setInfo() {
        currentlyPlaying.innerHTML = "Now playing: <a href=" + tracks[trNum].permalink_url + ">" + tracks[trNum].title + " </a> uploaded by <a href=" + tracks[trNum].user.permalink_url + ">" + tracks[trNum].user.username + "</a>"
        artwork.innerHTML = "<img src=" + tracks[trNum].artwork_url + ">";
        info.innerHTML =  tracks[trNum].genre + tracks[trNum].description
      }

      // setting up variables and event listeners
      let play = document.querySelector('#play');
      let pause = document.querySelector('#pause');
      let next = document.querySelector('#next');
      let currentlyPlaying = document.querySelector('.currently-playing');
      let artwork = document.querySelector('.artwork');
      let info = document.querySelector('.track-info');
      play.addEventListener('click', playSong);
      pause.addEventListener('click', pauseSong);
      next.addEventListener('click', nextSong)
    });
  });
})(ENV)
