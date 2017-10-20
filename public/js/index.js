
 (function(ENV) {

const client_id = ENV.client_id;
SC.initialize({
  client_id: client_id
});

i = 0

SC.get('/tracks', {
  q: 'summer',
}).then(function(tracks) {
  console.log(tracks);

  // begin streaming first track on list
  SC.stream('/tracks/' + tracks[i].id).then(function(player) {

    function playSong() {
      player.play()
      currentlyPlaying.innerHTML = "Now playing: " + tracks[i].title + " uploaded by " + tracks[i].user.username
      artwork.innerHTML = "<img src=" + tracks[i].artwork_url + ">";
    }

    function pauseSong() {
      player.pause()
    }

    function nextSong() {
      i++
      SC.stream('/tracks/' + tracks[i].id).then(function(player) {
        console.log(tracks[i].id)
        currentlyPlaying.innerHTML = "Now playing: " + tracks[i].title + " uploaded by " + tracks[i].user.username
        artwork.innerHTML = "<img src=" + tracks[i].artwork_url + ">";
        player.play()
        pause.addEventListener('click', function() {
          player.pause()
        });
      });
    }

    let play = document.querySelector('#play');
    let pause = document.querySelector('#pause');
    let next = document.querySelector('#next');
    let currentlyPlaying = document.querySelector('.currently-playing')
    let artwork = document.querySelector('.artwork');
    play.addEventListener('click', playSong);
    pause.addEventListener('click', pauseSong);
    next.addEventListener('click', nextSong)


  });
});


})(ENV)
