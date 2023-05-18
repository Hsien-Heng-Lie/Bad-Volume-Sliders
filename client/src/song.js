const audio = document.getElementById("audioPlayer");
const volumeLabel = document.getElementById("volumeLabel");
const volumeInput = document.getElementById("volumeInput");
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

function updateVolumeLabel(newVolumePercentage) {
  audio.volume = newVolumePercentage;
  volumeLabel.innerText = `Current volume: ${(newVolumePercentage * 100).toFixed(0)}%`;
}

function randomiseVolume() {
  updateVolumeLabel(Math.random());
}

function setVolume() {
  let requestedVolume = volumeInput.value;
  if (requestedVolume < 0) {
    volumeInput.value = 0;
    requestedVolume = 0;
  } else if (requestedVolume > 1000) {
    volumeInput.value = 1000;
    requestedVolume = 1000;
  }

  updateVolumeLabel(requestedVolume / 10 ** String(requestedVolume).length);
}

// volume.addEventListener("input", function(e) {
//     audio.volume = e.currentTarget.value / 100;
// })