const video = document.querySelector("#video");
const play = document.querySelector("#play");
const stopp = document.querySelector("#stop");
const progressBar = document.querySelector("#progress");
const timer = document.querySelector("#timestamp");
const duration = document.querySelector("#duration");

// ------------------Functions--------------------

// On pressing Space key
function onKeypress(e) {
  if (e.keyCode === 32) {
    toggleVideoStatus();
  }
}

// Updating Video Status
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
    updateIcon();
  } else {
    video.pause();
    updateIcon();
  }
}

// Updating Icon on Video Status Change
function updateIcon() {
  if (video.paused) {
    play.innerHTML = '<i class = "far fa-play-circle fa-2x"></i>';
  } else {
    play.innerHTML = '<i class = "far fa-pause-circle fa-2x"></i>';
  }
}

// Updating Progress Bar
function updateProgressBar() {
  progressBar.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  let mins2 = Math.floor(video.duration / 60);
  if (mins2 < 10) {
    mins2 = "0" + String(mins2);
  }
  let secs2 = Math.floor(video.duration % 60);
  if (secs2 < 10) {
    secs2 = "0" + String(secs2);
  }
  timer.textContent = mins + ":" + String(secs);
  duration.textContent = mins2 + ":" + String(secs2);
  //   timer.textContent = Math.round(video.currentTime);
}

// On Manual Change of Video Status
function setVideoProgress() {
  video.currentTime = (progressBar.value * video.duration) / 100;
}

// On Click of Stop Icon
function reset() {
  video.currentTime = 0;
  video.pause();
}

//-----------------Event Listeners-----------------

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updateIcon);
video.addEventListener("play", updateIcon);
video.addEventListener("timeupdate", updateProgressBar);

play.addEventListener("click", toggleVideoStatus);
stopp.addEventListener("click", reset);
progressBar.addEventListener("change", setVideoProgress);
