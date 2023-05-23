const audio = document.getElementById("idAudio");
let volume = document.getElementById("volume-slider");

function playaudio() {
  audio.play();
}
function pauseaudio() {
  audio.pause();
}
function stopaudio() {
  audio.pause();
  audio.currentTime = 0;
}

volume.addEventListener("input", function(e) {
    audio.volume = e.currentTarget.value / 100;
})

