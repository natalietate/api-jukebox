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

    SC.stream('/tracks/' + tracks[i].id).then(function(player) {

      function playSong() {
        player.play()
        setInfo();
      }

      function pauseSong() {
        player.pause()
      }

      function nextSong() {
        i++
        SC.stream('/tracks/' + tracks[i].id).then(function(player) {
          console.log(tracks[i].id)
          setInfo();
          player.play();
          pause.addEventListener('click', function() {
            player.pause()
          });
        });
      }

      function setInfo() {
        currentlyPlaying.innerHTML = "Now playing: <a href=" + tracks[i].permalink_url + ">" + tracks[i].title + " </a> uploaded by <a href=" + tracks[i].user.permalink_url + ">" + tracks[i].user.username + "</a>"
        artwork.innerHTML = "<img src=" + tracks[i].artwork_url + ">";
        info.innerHTML = "Genre: " + tracks[i].genre
      }
      play = document.querySelector('#play');
      pause = document.querySelector('#pause');
      next = document.querySelector('#next');
      currentlyPlaying = document.querySelector('.currently-playing');
      artwork = document.querySelector('.artwork');
      info = document.querySelector('.track-info');
      play.addEventListener('click', playSong);
      pause.addEventListener('click', pauseSong);
      next.addEventListener('click', nextSong)
    });
  });
})(ENV)
