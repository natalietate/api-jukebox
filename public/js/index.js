// all of your code needs to be inside this ENV function
// variables for dubugging purposes
// var track;
// var trackList;
// var soundCloud;


(function(ENV) {
  const client_id = ENV.client_id;
  SC.initialize({
    client_id: client_id
  });

  // Remember, tracks are returned as an array
  SC.get('/tracks', {
    q: 'smooth jazz',
  }).then(function(tracks) {
    let firstTrack = tracks[0];
    let secondTrack = tracks[1];

    SC.stream('/tracks/' + firstTrack.id).then(function(player) {
      let play = document.querySelector('#play');
      let pause = document.querySelector('#pause');
      let stop = document.querySelector('#stop');

      function playSong() {
        player.play()
        document.querySelector('.currently-playing').innerHTML = "Now playing: " + firstTrack.title + " by " + firstTrack.artist
      }

      function pauseSong() {
        player.pause()
      }

      play.addEventListener('click', playSong);
      pause.addEventListener('click', pauseSong);
    });

    SC.stream('/tracks/' + secondTrack.id).then(function(player) {
      let one = document.querySelector('#one');
      let pause = document.querySelector('#pause');

      function playSong() {
        player.play()
        document.querySelector('.currently-playing').innerHTML = "Now playing: " + secondTrack.title + " by " + secondTrack.artist
      }

      function pauseSong() {
        player.pause()
      }

      one.addEventListener('click', playSong);
      pause.addEventListener('click', pauseSong);

    });
  });



})(ENV)
