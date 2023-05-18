const audio = document.getElementById("audioPlayer");
const volumeLabel = document.getElementById("volumeLabel");
// let volume = document.getElementById("volume-slider");

function playSong() {
  audio.play();
}
function pauseSong() {
  audio.pause();
}
function stopSong() {
  audio.pause();
  audio.currentTime = 0;
}

function randomiseVolume() {
  audio.volume = Math.random().toFixed(2);
  volumeLabel.innerText = `Current volume: ${(audio.volume * 100).toFixed(0)}`;
}

// volume.addEventListener("input", function(e) {
//     audio.volume = e.currentTarget.value / 100;
// })