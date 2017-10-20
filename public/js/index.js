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
