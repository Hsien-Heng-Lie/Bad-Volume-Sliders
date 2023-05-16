const audio = document.getElementById("idAudio");
let volume = document.getElementById("volume-slider");

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

volume.addEventListener("input", function(e) {
    audio.volume = e.currentTarget.value / 100;
})