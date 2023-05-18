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

function clipVolume(requestedVolume, min=0, max=1000) {
  if (requestedVolume < min) {
    return min;
  }
  if (requestedVolume > max) {
    return max;
  }
  return requestedVolume;
}

function updateVolumeLabel(newVolume, normalize=false) {
  const normalizedVolume = clipVolume(normalize ? newVolume / 10 ** String(newVolume).length : newVolume, 0, 1);
  audio.volume = normalizedVolume;
  volumeLabel.innerText = `Current volume: ${(normalizedVolume * 100).toFixed(0)}%`;
}

function randomiseVolume() {
  updateVolumeLabel(Math.random());
}

function setVolume() {
  const clippedVolume = clipVolume(volumeInput.value);
  volumeInput.value = clippedVolume;

  updateVolumeLabel(clippedVolume, true);
}

function squareRootVolume() {
  updateVolumeLabel(Math.sqrt(audio.volume * 100) / 100);
}

function squareVolume() {
  updateVolumeLabel(Math.pow(audio.volume * 100, 2) / 100);
}

function increaseVolume() {
  updateVolumeLabel(audio.volume + 0.001);
}

function decreaseVolume() {
  updateVolumeLabel(audio.volume - 0.001);
}

// volume.addEventListener("input", function(e) {
//     audio.volume = e.currentTarget.value / 100;
// })