const audio = document.getElementById('audio-player');
const label = document.getElementById('volume-label');
const slider = document.getElementById('volume-slider');

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');

playButton.addEventListener('click', () =>
  audio.play()
);

pauseButton.addEventListener('click', () =>
  audio.pause()
);

stopButton.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
});

slider.addEventListener('input', volumeSliderUpdate);
slider.addEventListener('change', volumeSliderUpdate);

function volumeSliderUpdate() {
  const roundedVolume = parseInt(slider.value).toFixed(0);
  audio.volume = roundedVolume / 100;
  slider.value = roundedVolume;
  label.innerText = `Current volume: ${roundedVolume}%`;
}