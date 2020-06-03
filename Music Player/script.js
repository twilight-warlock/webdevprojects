const musicContainer = document.getElementById("music-container");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const volbtn = document.getElementById("vol");
// Song Titles
const songs = [
  "GF BF",
  "Baaki Baatein Peene Baad",
  "Forbidden Voices",
  "Buddhu Sa Mann",
  "What Do You Mean"
];

let songIndex = 3;

// --------------------------Functions------------------------------
function loadSong(song) {
  songTitle.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `imgs/${song}.jpg`;
}

function pauseSong() {
  audio.pause();
  play.innerHTML = `<i class = "fas fa-play"></i>`;
  musicContainer.classList.remove("play");
}

function playSong() {
  audio.play();
  play.innerHTML = `<i class = "fas fa-pause"></i>`;
  musicContainer.classList.add("play");
}

function nextSong() {
  songIndex += 1;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex -= 1;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgressBar() {
  const played = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${played}%`;
  //   if (audio.duration === audio.currentTime) {
  //     nextSong();
  //   }
}

function drag(e) {
  const width = this.clientWidth;
  const dragged = e.offsetX;
  audio.currentTime = (dragged / width) * audio.duration;
}

function muteAudio() {
  if (volbtn.classList.contains("soundOn")) {
    volbtn.classList.remove("soundOn");
    volbtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    audio.muted = true;
  } else {
    volbtn.classList.add("soundOn");
    volbtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    audio.muted = false;
  }
}

function playOrPause() {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// --------------------------Event Listeners------------------------
play.addEventListener("click", playOrPause);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", drag);
volbtn.addEventListener("click", muteAudio);
window.addEventListener("keydown", e => {
  if (e.keyCode === 173) {
    muteAudio();
  }
  if (e.keyCode === 32) {
    playOrPause();
  }
});

// window.addEventListener("keydown", e => {
//   if (e.keyCode === 32) {
//     if (audio.play()) {
//       pauseSong();
//     } else if (audio.pause()) {
//       playSong();
//     }
//   }
// });
loadSong(songs[songIndex]);
