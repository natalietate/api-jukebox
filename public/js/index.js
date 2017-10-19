// all of your code needs to be inside this ENV function
// variables for dubugging purposes
var track;
var trackList;
var soundCloud;


(function(ENV) {
  const client_id = ENV.client_id;
  SC.initialize({
    client_id: client_id
  });

  // stream track id 293
  SC.stream('/tracks/293').then(function(player) {
    var play = document.querySelector('#play');
    var pause = document.querySelector('#pause');
    var stop = document.querySelector('#stop');

    function playSong() {
      player.play()
    }

    function pauseSong() {
      player.pause()
    }

    play.addEventListener('click', playSong);
    pause.addEventListener('click', pauseSong);

  });

  // Remember, tracks are returned as an array
  SC.get('/tracks', {
    q: 'smooth jazz',
  }).then(function(tracks) {
    let firstTrack = tracks[1];

    SC.stream('/tracks/' + firstTrack.id).then(function(player) {


    });
  });


})(ENV)
