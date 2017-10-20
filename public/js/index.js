// all of your code needs to be inside this ENV function

// (function(ENV) {

const client_id = ENV.client_id;
SC.initialize({
  client_id: client_id
});

i = 0

SC.get('/tracks', {
  q: 'summer',
}).then(function(tracks) {

  console.log(tracks);
  // let firstTrack = tracks[0];

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


// })(ENV)




// function nextSong() {
//   let currentTrack = 0;
//
//   if (tracks.indexOf(currentTrack) < tracks.length) {
//     console.log(tracks)
//     let nextTrack = tracks[1]
//     SC.stream('/tracks/' + nextTrack.id).then(function(player) {
//       player.play()
//       pause.addEventListener('click', function() {
//         player.pause()
//       });
//     });
//   }
// }

// function nextSong() {
//   for (var x = 0; x < tracks.length - 1; x++) {
//     tracks[x].id + 1
//     console.log(tracks[x].id)
//     SC.stream('/tracks/' + tracks[x].id).then(function(player) {
//       player.play()
//       pause.addEventListener('click', function() {
//         player.pause()
//       });
//     });
//   };
// }
